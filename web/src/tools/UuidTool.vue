<script setup>
import { ref } from 'vue';
import { v4 } from 'uuid';
import TextInput from '../components/TextInput.vue';

const output = ref('');

function generateV4() {
  output.value = v4();
}
generateV4();

</script>

<template>
  <div>
    <h2>UUID Generator</h2>
    <div class="form">
      <TextInput v-model="output" label="UUIDv4" />
    </div>
    <button @click="generateV4">New UUID</button>
  </div>
</template>

<style scoped>
.form {
  justify-content: center;
  width: 25rem;
  max-width: 100%;
}
</style>
