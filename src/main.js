import { createApp } from 'vue';
import App from './App.vue';

if (typeof window !== 'undefined') {
  import('./ReloadPrompt.vue');
}

createApp(App).mount('#app');
