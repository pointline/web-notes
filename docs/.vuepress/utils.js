const path = require("path");
const fs = require("fs");
const sidebarMap = require("./sidebarMap");

module.exports = () => {
  const sidebar = {};

  sidebarMap.forEach(k => {
    const parentDir = `/${k}/`;
    sidebar[parentDir] = [];

    const dir = path.resolve(__dirname, "../" + k);
    const childrenDir = fs
      .readdirSync(dir)
      .filter(fileName => !fileName.endsWith(".md"));

    childrenDir.forEach(folder => {
      sidebar[parentDir].push({
        title: folder,
        collapsable: true,
        children: fs
          .readdirSync(`${dir}/${folder}`)
          .filter(fileName => !fileName.includes("README.md"))
          .map(fileName => `${parentDir}${folder}/${fileName}`)
      });
    });
  });

  return sidebar;
};
