const { Client } = require('pg');
const fs = require('fs');
const geojson = require('geojson');
const proj4 = require('proj4');

// Read GeoJSON file
const geojsonData = JSON.parse(fs.readFileSync('geojson/HKGS_Dataset_Distribution-of-Metered-Parking-Spaces-and-Occupancy-of-those-Installed-with-New-Parking-Meters_2022-07-13-0800-00_fullset.geojson', 'utf8'));

// Define the coordinate transformation
const fromCRS = 'EPSG:2326';
const toCRS = 'EPSG:4326';
proj4.defs([
  [
    fromCRS,
    '+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425 +units=m +no_defs',
  ],
  [toCRS, proj4.defs('WGS84')],
]);


// Connect to PostgreSQL
const client = new Client({
  host: '192.168.0.200',
  port: 5434,
  user: 'postgres',
  password: 'capphoto',
  database: 'test-geo',
});

async function main() {
  await client.connect();

  // Create table
  await client.query(`
    CREATE TABLE IF NOT EXISTS test_geojson (
      id SERIAL PRIMARY KEY,
      feature_id VARCHAR(255),
      properties JSONB,
      geom GEOMETRY(Point, 4326)
    );
  `);

  // Enable PostGIS extension if it's not enabled yet
  await client.query(`CREATE EXTENSION IF NOT EXISTS postgis;`);

  // Insert GeoJSON data into the table
  for (const feature of geojsonData.features) {
    const { id, geometry, properties } = feature;
    const { coordinates } = geometry;

    // Convert easting and northing to longitude and latitude
    const [longitude, latitude] = proj4(fromCRS, toCRS, [coordinates[0], coordinates[1]]);

    const wktPoint = `POINT(${longitude} ${latitude})`;

    await client.query(
      `
        INSERT INTO test_geojson (feature_id, properties, geom)
        VALUES ($1, $2, ST_GeomFromText($3, 4326));
      `,
      [id, properties, wktPoint]
    );
  }

  console.log('Data imported successfully.');
  await client.end();
}

main().catch((error) => {
  console.error(error);
  client.end();
});
