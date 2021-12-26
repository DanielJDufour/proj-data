const fs = require("fs");
const papaparse = require("papaparse");
const wktcrs = require("wkt-crs");

const csv_text = fs.readFileSync("./data/crs.csv", "utf-8");
const parsed = papaparse.parse(csv_text, { header: true });
const rows = parsed.data;

const clean = str => {
  if (str.startsWith("'") && str.endsWith("'")) str = str.substring(1, str.length - 1);
  return str;
};

const defs = rows
.filter(row => row.code && (row.proj4 || row.wkt || row.esriwkt))
// .sort((a, b) => Math.sign(a.code - b.code))
.map((row, i, arr) => {
  // const diff = parseInt(row.code) - parseInt(arr[i-1]?.code || 0) - 1;
  return [
    // diff,
    row.code,
    row.proj4,
    row.wkt ? wktcrs.parse(clean(row.wkt), { raw: true }).data : "",
    row.esriwkt ? wktcrs.parse(clean(row.esriwkt), { raw: true }).data : ""
  ]
});

for (let i = 0; i < defs[0].length; i++) {
  console.log("trying " + i);
  if (defs.every(arr => arr[i] === "")) {
    throw new Error("uh oh. " + i);
  }
}

fs.writeFileSync("./data/proj.json", JSON.stringify(defs));
console.log("wrote ./data/proj.json");

console.log("completed step 2");

