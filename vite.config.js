import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteFonts from 'vite-plugin-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteFonts({
      google: {
        families: [
          {
            name: 'Slabo',
            styles: 'regular,wght@0,700',
          },
          {
            name: 'Lato',
            styles: 'regular,wght@0,400',
          },
          {
            name: 'Source Code Pro',
            styles: 'regular,wght@0,400',
          },
        ],
      },
    }),
  ],
});
