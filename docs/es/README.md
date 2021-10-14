---
home: true
title: página delantera
heroImage: /images/hero.png
actions:
  - text: Empiece rápido
    link: /es/guide/getting-started.html
    type: primary
  - text: 项目简介
    link: /es/guide/
    type: secondary
features:
  - title: 简洁至上
    details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
  - title: Vue 驱动
    details: 享受 Vue 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
  - title: 高性能
    details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。
  - title: 主题
    details: 提供了一个开箱即用的默认主题。你也可以挑选一个社区主题，或者创建一个你自己的主题。
  - title: 插件
    details: 灵活的插件API，使得插件可以为你的站点提供许多即插即用的功能。
  - title: 打包工具
    details: 既支持 Webpack 也支持 Vite。选一个你喜欢的来使用吧！
footer: MIT Licensed | Copyright © 2018-present Evan You
---

### Tan fácil como contar 1, 2, 3

<CodeGroup>
   <CodeGroupItem title = "YARN" activo>

`` bash
# Instalar en su proyecto
añadir hilo -D vuepress @ siguiente

# Crea un nuevo archivo de rebajas
echo '# Hola VuePress'> README.md

# Empieza a escribir
hilo vuepress dev

# Crea archivos estáticos
hilo vuepress build
''

   </CodeGroupItem>

   <CodeGroupItem title = "NPM">

`` bash
# Instalar en su proyecto
npm install -D vuepress @ siguiente

# Crea un nuevo archivo de rebajas
echo '# Hola VuePress'> README.md

# Empieza a escribir
npx vuepress dev

# Crea archivos estáticos
compilación de npx vuepress
''
  </CodeGroupItem>
</CodeGroup>
