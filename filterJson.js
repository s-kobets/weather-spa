const fs = require('fs');
const path = require('path');
const util = require('util');

const fs_writeFile = util.promisify(fs.writeFile);
const fs_readFile = util.promisify(fs.readFile);

(async () => {
  const pathData = (process.cwd(), 'src/data.json');
  try {
    const data = await fs_readFile(pathData, 'utf8');
    const dataCity = JSON.parse(data).map(city => ({
      id: city.id,
      name: city.name,
      country: city.country
    }));

    await fs_writeFile(pathData, JSON.stringify(dataCity, '', 2));
  } catch (e) {
    console.error(e);
  }

  console.log('JSON done');
})();
