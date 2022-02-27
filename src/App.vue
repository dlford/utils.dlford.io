<script setup>
import Layout from './components/LayoutComponent.vue';
</script>

<template>
  <Layout />
</template>

<style>
:root {
  --white: #eee;
  --black: #011;
  --primary: #232c34;
  --primary-dark: #1a2126;
}

body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  max-height: 100%;
  background-color: var(--primary);
  color: var(--white);
}
</style>
