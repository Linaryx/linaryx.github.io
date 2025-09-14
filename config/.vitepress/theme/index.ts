import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import Stats from '../components/Stats.vue';
import initThemeWave from './theme-switch.js';
import Layout from './Layout.vue';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Stats', Stats);
    if (typeof window !== 'undefined') initThemeWave();
  },
} satisfies Theme;
