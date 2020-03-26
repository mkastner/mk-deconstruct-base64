const tape = require('tape');
const log = require('mk-log');
const fs = require('fs').promises;
const path = require('path');
const deconstructBase64 = require('../');

async function main() {

  tape('basic test', async (t) => {
 
    try {
     
      const base64PNG = await fs.readFile(
        path.join(__dirname, 'assets', 'example-mini-png.base64'), 'utf8');
      const pngResult = deconstructBase64(base64PNG);
      t.equals('image/png', pngResult.mimeType);
      t.equals('png', pngResult.extension);
      t.ok(pngResult.data, 'should extract png data');

      const base64JPG = await fs.readFile(
        path.join(__dirname, 'assets', 'example-mini-jpg.base64'), 'utf8');
      const jpgResult = deconstructBase64(base64JPG);
      t.equals('image/jpeg', jpgResult.mimeType);
      t.equals('jpg', jpgResult.extension);
      t.ok(jpgResult.data, 'should extract jpg data');
      
      const base64GIF = await fs.readFile(
        path.join(__dirname, 'assets', 'example-mini-gif.base64'), 'utf8');
      const gifResult = deconstructBase64(base64GIF);
      t.equals('image/gif', gifResult.mimeType);
      t.equals('gif', gifResult.extension);
      t.ok(gifResult.data, 'should extract gif data');

    } catch (err) {
      log.error(err);
    } finally {
      t.end();
    }
  });
}

main();
