import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['~/assets/css/tokens.css', '~/assets/css/base.css'],
  app: {
    head: {
      title: 'Ruina.team',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap'
        }
      ],
      meta: [
        { name: 'theme-color', content: '#09090b' },
        { name: 'og:type', content: 'website' },
        { name: 'og:title', content: 'Ruina.team' },
        { name: 'og:description', content: 'Guides, modpacks, chat tiers — единый хаб' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''
    }
  },
  build: {
    transpile: ['primevue']
  },
  components: {
    dirs: ['~/components']
  },
  content: {
    highlight: false
  },
  nitro: {
    preset: 'github-pages',
    prerender: {
      routes: ['/']
    }
  }
});
