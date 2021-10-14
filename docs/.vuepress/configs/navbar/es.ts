import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta'

export const es: NavbarConfig = [
  {
    text: 'Guía',
    link: '/es/guide/',
  },
  {
    text: 'Plataforma Pegasus IoT',
    children: [
      {
        text: 'Pegasus',
        children: [
          {
            text: 'Ingresar',
            link: 'https://cloud.pegasusgateway.com/v2',
          },
          {
            text: 'Documentacion APIs',
            link: 'https://docs.pegasusgateway.com',
          },
          {
            text: 'Referencia de API',
            link: 'https://cloud.pegasusgateway.com/api-static/docs',
          },
        ],
      },
    ],
  },
  {
    text: `v${version}`,
    children: [],
  },
]
