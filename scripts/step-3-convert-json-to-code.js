const fs = require("fs");
const jsonToCode = require("json-to-code");

const data = require("./data/proj.json");

let { code } = jsonToCode.encode({ data });
console.log("encoded ", code.length);

const filepath = require("path").resolve("data/proj.js");
fs.writeFileSync(filepath, code, "utf-8");
console.log("wrote " + filepath);

console.log("completed step 3");
