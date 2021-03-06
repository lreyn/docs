import type { SidebarConfig } from '@vuepress/theme-default'

export const en: SidebarConfig = {
  '/guide/': [
    {
      text: 'Guide',
      children: ['/guide/README.md'],
    },
    {
      text: 'API',
      children: ['/guide/api.md'],
    },
    {
      text: 'PetStore',
      children: ['/petstore/README.md'],
    },
  ],
}
