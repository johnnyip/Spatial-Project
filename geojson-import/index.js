const fs = require('fs');
const pg = require('pg');
const wellknown = require('wellknown');
const copyFrom = require('pg-copy-streams').from;

const geojsonData = fs.readFileSync('geojson/HKGS_Dataset_FEHD-facility-and-service-locations_2023-03-14-1708-02_fullset.geojson', 'utf-8');

const connectionString = 'postgres://ust:USTust123!@johnnyip.com:5434/test-geo';

(async () => {
  const client = new pg.Client(connectionString);
  await client.connect();

  const geojson = JSON.parse(geojsonData);
  const features = geojson.features;

  const copyStream = client.query(
    copyFrom('COPY public_toilets (gmid, northing, easting, dataset, facility_name, address, district, type, telephone1, telephone2, fax_number, opening_hours, internal_id, last_update, geom) FROM STDIN (FORMAT csv)')
  );

  copyStream.on('error', (err) => {
    console.error('Error importing data:', err);
  });

  copyStream.on('end', async () => {
    console.log('Data imported successfully');
    await client.end();
  });

  for (const feature of features) {
    const { properties, geometry } = feature;
    const wkt = wellknown.stringify(geometry);
    const row = [
      properties.GMID,
      properties.Northing,
      properties.Easting,
      properties.Dataset,
      properties['Facility Name'],
      properties.Address,
      properties.District,
      properties.Type,
      properties.Telephone1,
      properties.Telephone2,
      properties['Fax Number'],
      properties['Opening Hours'],
      properties.ID,
      properties['Last Update'],
      wkt,
    ]
    .map((value) => {
      if (value === undefined || value === 'N.A.') {
        return '';
      } else if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`;
      } else {
        return value;
      }
    })
    .join(',');
    
    copyStream.write(row + '\n');
  }

  copyStream.end();
})();
