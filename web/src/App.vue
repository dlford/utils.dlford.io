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
  --red: #ff6246;
  --font-display: 'Slabo', sans-serif;
  --font-body: 'Lato', sans-serif;
  --font-mono: 'Source Code Pro', monospace;
}

body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  max-height: 100%;
  background-color: var(--primary);
  color: var(--white);
  font-family: var(--font-body);
  font-weight: 400;
}

h1,
.h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  font-family: var(--font-display);
  font-weight: 700;
  padding-bottom: 1rem;
  margin: 0;
  line-height: 1.1;
}

h1,
.h1 {
  font-size: 3.1875rem;
}

h2,
.h2 {
  font-size: 1.9792rem;
}

h3,
.h3 {
  font-size: 1.4792rem;
}

h4,
.h4 {
  font-size: 1.2292rem;
}

h5,
.h5 {
  font-size: 1.1042rem;
}

h6,
.h6 {
  font-size: 1rem;
}

p {
  padding-bottom: 1rem;
  margin: 0;
}

a {
  color: var(--white);
}

label {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
}

textarea,
input {
  margin-top: 0.25rem;
  background-color: var(--primary-dark);
  color: var(--white);
  font-size: 1.1042rem;
  border: none;
  font-family: var(--font-mono);
}

textarea {
  min-height: 9ch;
}

.error {
  color: var(--red);
}

.tool p {
  max-width: 300px;
}
</style>
