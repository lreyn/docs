import type { NavbarConfig } from '@vuepress/theme-default'
// import { version } from '../meta'

export const en: NavbarConfig = [
  {
    text: 'Guide',
    link: '/guide/',
  },
  {
    text: 'Pegasus IoT Platform',
    children: [
      {
        text: 'Pegasus',
        children: [
          {
            text: 'Login',
            link: 'https://cloud.pegasusgateway.com/v2',
          },
          {
            text: 'API Docs',
            link: 'https://docs.pegasusgateway.com',
          },
          {
            text: 'API Reference',
            link: 'https://cloud.pegasusgateway.com/api-static/docs',
          },
        ],
      },
    ],
  },
  // {
  //   text: `v${version}`,
  //   children: [
  //     {
  //       text: 'v0.1',
  //       link: '#'
  //     }
  //   ],
  // },
]
