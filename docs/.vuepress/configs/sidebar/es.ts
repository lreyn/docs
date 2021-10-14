import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/es/guide/': [
    {
      text: 'Guía',
      children: ['/guide/README.md'],
    },
  ],
}
