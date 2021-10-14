import { defineUserConfig } from '@vuepress/cli'
import type { DefaultThemeOptions } from '@vuepress/theme-default'
import { path } from '@vuepress/utils'
import { navbar, sidebar } from './configs'

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/images/icons/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/images/icons/favicon-32x32.png`,
      },
    ],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'application-name', content: 'VuePress' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'VuePress' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/images/icons/apple-touch-icon.png` },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/images/icons/safari-pinned-tab.svg',
        color: '#3eaf7c',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#005596' }],
    ['meta', { name: 'theme-color', content: '#005596' }],
  ],

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'DCT Docs',
      description: 'CONNECT | DEVELOP | MANAGE | DEPLOY',
    },
    // '/es/': {
    //   lang: 'es-ES',
    //   title: 'Docs para Syrus 4',
    //   description: 'Documentacion para el Syrus 4',
    // },
  },

  bundler:
    process.env.DOCS_BUNDLER ??
    (isProd ? '@vuepress/webpack' : '@vuepress/vite'),

  themeConfig: {
    logo: '/images/hero.png',
    repo: 'lreyn/docs.git',
    docsDir: 'docs',
    locales: {
      '/': {
        // navbar
        navbar: navbar.en,
        selectLanguageText: '🌎',

        // sidebar
        sidebar: sidebar.en,
        sidebarDepth: 3,

        // page meta
        editLink: true,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: true,
        lastUpdatedText: 'Last Updated',
        contributors: true,
        contributorsText: 'Contributors',
      },
      // '/es/': {
      //   // navbar
      //   navbar: navbar.es,
      //   selectLanguageName: 'Español',
      //   selectLanguageText: 'Elige un idioma',
      //   selectLanguageAriaLabel: 'Elige un idioma',

      //   // sidebar
      //   sidebar: sidebar.es,

      //   // page meta
      //   editLinkText: 'Edita esta página en GitHub',
      //   lastUpdatedText: 'Última actualización',
      //   contributorsText: 'Contribuyente',

      //   // custom containers
      //   tip: 'Consejo',
      //   warning: 'Aviso',
      //   danger: 'Peligro',

      //   // 404 page
      //   notFound: [
      //     'Nada aquí',
      //     '¿Por qué estamos aquí?',
      //     'Esta es una página 404',
      //     'Parece que ingresamos el enlace incorrecto',
      //   ],
      //   backToHome: 'Volver a la página de inicio',

      //   // a11y
      //   openInNewWindow: 'Abrir en Nueva ventana',
      //   toggleDarkMode: 'Alternar el modo nocturno',
      //   toggleSidebar: 'Alternar barra lateral',
      // },
    },

    themePlugins: {
      git: isProd,
    },
  },

  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(
          /^@vuepress/,
          path.resolve(__dirname, '../../packages/@vuepress')
        ),
    },
  },

  plugins: [
    ['@vuepress/plugin-debug'],
    [
      '@vuepress/plugin-docsearch',
      {
        apiKey: '3a539aab83105f01761a137c61004d85',
        indexName: 'vuepress',
        searchParameters: {
          facetFilters: ['tags:v2'],
        },
        // locales: {
        //   '/es/': {
        //     placeholder: 'Buscar documentos',
        //   },
        // },
      },
    ],
    [
      '@vuepress/plugin-google-analytics',
      {
        id: process.env.DOCS_GA_ID,
      },
    ],
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    // only enable shiki plugin in production mode
    [
      '@vuepress/plugin-shiki',
      isProd
        ? {
            theme: 'dark-plus',
          }
        : false,
    ],
  ],
})
