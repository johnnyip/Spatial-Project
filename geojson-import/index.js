const { Client } = require('pg');
const fs = require('fs');
const geojson = require('geojson');

// Read GeoJSON file
const geojsonData = JSON.parse(fs.readFileSync('geojson/HKGS_Dataset_Distribution-of-Metered-Parking-Spaces-and-Occupancy-of-those-Installed-with-New-Parking-Meters_2022-07-13-0800-00_fullset.geojson', 'utf8'));

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
    const wktPoint = `POINT(${coordinates[0]} ${coordinates[1]})`;

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
