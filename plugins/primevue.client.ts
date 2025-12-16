import PrimeVue from 'primevue/config';
import ColorPicker from 'primevue/colorpicker';
import Aura from '@primeuix/themes/aura';

import 'primeicons/primeicons.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  });
  nuxtApp.vueApp.component('ColorPicker', ColorPicker);
});
