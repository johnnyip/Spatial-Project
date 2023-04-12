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
    copyFrom('COPY toilets (gmid, northing, easting, dataset, "facility name", address, "數據集", "設施名稱", "地址", district, "地區", type, "設施類別", telephone1, "電話1", telephone2, "電話2", "fax number", "傳真", "opening hours", "開放時間", id, "編號", "last update", "更新日期", geom) FROM STDIN (FORMAT csv)')
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
      properties["數據集"],
      properties["設施名稱"],
      properties["地址"],
      properties.District,
      properties["地區"],
      properties.Type,
      properties["設施類別"],
      properties.Telephone1,
      properties["電話1"],
      properties.Telephone2,
      properties["電話2"],
      properties['Fax Number'],
      properties["傳真"],
      properties['Opening Hours'],
      properties["開放時間"],
      properties.ID,
      properties["編號"],
      properties['Last Update'],
      properties["更新日期"],
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
