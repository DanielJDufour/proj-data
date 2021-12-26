const fs = require("fs");

let code = fs.readFileSync("./data/proj.js", "utf-8");

code = `const wktcrs = require("wkt-crs");\n` + 

  code.replace(/;$/, "") + 

  `\n.reduce((acc, item, i, arr) => {
  acc["EPSG:" + item[0]] = {
    proj4: item[1],
    wkt: wktcrs.unparse(item[2]).data,
    esriwkt: wktcrs.unparse(item[3]).data
  }
  return acc;
}, {});
`;

const filepath = require("path").resolve("data/proj-mod.js");
fs.writeFileSync(filepath, code, "utf-8");
console.log("wrote " + filepath);

console.log("completed step 4");
