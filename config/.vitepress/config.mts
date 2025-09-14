import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Wikyx - вики чата',
  base: '/',
  description: 'Википедия чата Заквиеля',
  cleanUrls: true,

  themeConfig: {
    siteTitle: false,
    logo: '/favicon.ico',

    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Сборка', link: '/sborka' },
      { text: 'Гайды', link: '/guides' },
    ],

    sidebar: {
      '/': [
        {
          text: 'Гайды',
          items: [
            { text: 'Оглавление', link: '/guides' },
            { text: 'Как включить смайлы на Twitch', link: '/guides/emotesGuide' },
          ],
        },
        {
          text: 'Сборка',
          items: [{ text: 'Fear Nightfall v1.1.3', link: '/sborka' }],
        },
      ],
    },

    socialLinks: [
      { icon: 'youtube', link: 'https://www.youtube.com/@zakvielchannel' },
      { icon: 'twitch', link: 'https://www.twitch.tv/zakvielchannel' },
      { icon: 'telegram', link: 'https://t.me/zakvielchannel' },
    ],

    footer: {
      message: 'Linaryx dev',
      copyright: 'Copyright © 2025',
    },
  },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
      },
    ],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'ru_RU' }],
    ['meta', { name: 'og:title', content: 'Wikyx - вики для чата' }],
    ['meta', { name: 'og:site_name', content: 'Wikyx' }],
    ['meta', { name: 'og:image', content: '/img/logo.webp' }],
    ['meta', { name: 'og:url', content: 'https://zakviel.wiki/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Wikyx - вики для чата' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Википедия нужных инструкций',
      },
    ],
    [
      'meta',
      {
        name: 'keywords',
        content: 'заквиель, zakviel, стример, ютубер, майнкрафт, спидран, twitch, youtube, игры, гайды, вики, википедия',
      },
    ],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
  ],

  sitemap: {
    hostname: 'https://zakviel.wiki',
  },
});
