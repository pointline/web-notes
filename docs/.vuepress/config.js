const generate = require("./utils");

module.exports = {
  title: "Notes",
  description: "前端笔记",
  // 子路径
  base: "/web-notes/",
  // 页面heade部分需要增加的内容
  head: [
    // icon
    ["link", { rel: "icon", href: "assets/favicon.ico" }]
  ],
  themeConfig: {
    nav: [
      {
        text: "Languages",
        items: [
          { text: "CSS", link: "/Languages/CSS/" },
          { text: "HTML", link: "/Languages/HTML/" },
          { text: "JavaScript", link: "/Languages/JavaScript/" },
          { text: "TypeScript", link: "/Languages/TypeScript/" }
        ]
      },
      {
        text: "Frameworks",
        items: [{ text: "React", link: "/Frameworks/React/" }]
      },
      {
        text: "Book",
        link: '/Book/'
      },
      {
        text: "Collect",
        items: [
          { text: "Package", link: "/Package/"},
          { text: "E-Book", link: "/E-Book/" },
          { text: "Article", link: "/Article/"},
          { text: "Blog", link: "/Blog/" },
          { text: "Website", link: "/Website/" },
        ]
      },
      {
        text: "Others",
        items: [
          { text: "Tools", link: "/Tools/"}
        ]
      }
    ],
    sidebar: generate(),
    // sidebar: {
    //   "/JS/TypeScript/": [
    //     {
    //       title: "Base",
    //       collapsable: true,
    //       children: ["/JS/TypeScript/Base/01-类型"]
    //     },
    //     {
    //       title: "Resource",
    //       collapsable: true
    //     }
    //   ]
    // },
    // 添加最后更新的时间
    lastUpdated: "Last Updated", // string | boolean
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "pointline/web-notes",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    docsDir: 'docs',
    smoothScroll: true
  },
  // webpack配置
  chainWebpack: (config, isServer) => {
    const inlineLimit = 10000;
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: inlineLimit,
        name: `assets/[name].[hash:8].[ext]`
      });
  },
  // markdown 配置
  markdown: {
    // 显示行号
    lineNumbers: true
  },
  plugins: [
    "@vuepress/back-to-top",
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-155060653-1"
      }
    ],
    "@vuepress/medium-zoom"
  ]
};
