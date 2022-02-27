<script setup>
import { ref, computed } from 'vue';
import TextInput from '../components/TextInput.vue';

const textValue = ref('');
const replaced = computed(() => {
  return `value: ${textValue.value}`;
});
</script>

<template>
  <div>
    <TextInput v-model="textValue" label="Input Test" />
    <p>{{ replaced }}</p>
  </div>
</template>

<style scoped></style>
