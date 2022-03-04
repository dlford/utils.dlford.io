<script setup>
import { ref } from 'vue';

const deferredPrompt = ref(undefined);

window.addEventListener('beforeinstallprompt', (e) => {
  deferredPrompt.value = e;
});

async function installApp() {
  if (deferredPrompt.value !== undefined) {
    deferredPrompt.value.prompt();
    const { outcome } = await deferredPrompt.value.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt.value = null;
    }
  }
}
</script>

<template>
  <div>
    <h2>Welcome</h2>
    <p>Choose a tool from the menu to get started!</p>
    <p>
      Don't see the tool you need?
      <a
        href="https://github.com/dlford/utils.dlford.io/issues/new"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View source on GitHub"
      >
        Request it here
      </a>
    </p>
    <div v-if="deferredPrompt">
      <p
        >This app can be installed on your device as a Progressive Web
        App (<a
          href="https://en.wikipedia.org/wiki/Progressive_web_application"
          target="_blank"
          rel="noopener noreferrer"
          >What is a PWA?</a
        >)</p
      >
      <button @click="installApp">Install it!</button>
    </div>
  </div>
</template>
