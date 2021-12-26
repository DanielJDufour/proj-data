const fs = require("fs");
const decompress = require("decompress");
const fetch = require("cross-fetch");

(async () => {
  const response = await fetch("https://github.com/DanielJDufour/crs-json/raw/main/crs.json.zip");
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const files = await decompress(buffer);
  const file = files[0];
  const json_text = file.data.toString('utf-8');
  console.log("json_text:", json_text.substr(0, 100));
  fs.writeFileSync("data/crs.json", json_text);
  console.log("completed step 1");
})();
