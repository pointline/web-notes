const path = require("path");
const fs = require("fs");
const sidebarMap = require("./sidebarMap");

function log(data) {
  fs.writeFileSync(__dirname + "/log.json", JSON.stringify(data), err => {
    if (err) return;
    console.log("write done");
  });
}

function isTypeSync(fsStatType, statsMethodName, filePath) {
  if (typeof filePath !== "string") {
    throw new TypeError(`Expected a string, got ${typeof filePath}`);
  }

  try {
    return fs[fsStatType](filePath)[statsMethodName]();
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

const isDirSync = isTypeSync.bind(null, "statSync", "isDirectory");

function deepReaddirTreeSync(filePath, relativePath) {
  if (typeof filePath !== "string") {
    throw new TypeError(`Expected a string, got ${typeof filePath}`);
  }
  const sidebar = [];
  const dir = fs
    .readdirSync(filePath)
    .filter(fileName => !(fileName.indexOf("README") > -1));

  dir.forEach(fileName => {
    if(fileName === 'media') return;
    if (isDirSync(`${filePath}/${fileName}`)) {
      sidebar.push({
        title: fileName.replace(/\d+-/, ""),
        collapsable: true,
        sidebarDepth: 3,
        children: deepReaddirTreeSync(
          `${filePath}/${fileName}`,
          `${relativePath}/${fileName}`
        )
      });
    } else {
      sidebar.push(`${relativePath}/${fileName}`);
    }
  });

  return sidebar;
}

module.exports = () => {
  const sidebar = {};

  sidebarMap.forEach(k => {
    const keyPath = `/${k}/`;
    const dir = path.resolve(__dirname, "../" + k);

    sidebar[keyPath] = deepReaddirTreeSync(dir, `/${k}`);
  });

  return sidebar;
};
