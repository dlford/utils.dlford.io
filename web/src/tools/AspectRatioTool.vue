<script setup>
import { watch, ref } from 'vue';
import TextInput from '../components/TextInput.vue';

const types = {
  inputWidth: 'INPUT_WIDTH',
  inputHeight: 'INPUT_HEIGHT',
  outputWidth: 'OUTPUT_WIDTH',
  outputHeight: 'OUTPUT_HEIGHT',
};

const inputWidth = ref(undefined);
const inputHeight = ref(undefined);
const outputWidth = ref(undefined);
const outputHeight = ref(undefined);
const ratio = ref('');

/*
watch((), (val) => {
  console.log(val);
});
*/

function sanitize(input) {
  return input.replace(/[^0-9.]/g, '');
}

function handleChange(type) {
  switch (type) {
    case types.inputWidth:
      inputWidth.value = sanitize(inputWidth.value);
      break;
    case types.inputHeight:
      inputHeight.value = sanitize(inputHeight.value);
      break;
    case types.outputWidth:
      outputWidth.value = sanitize(outputWidth.value);
      break;
    case types.outputHeight:
      outputHeight.value = sanitize(outputHeight.value);
      break;
    default:
      break;
  }
}
</script>

<template>
  <div>
    <h2>Aspect Ratio Calculator</h2>
    <TextInput
      v-model="inputWidth"
      inputmode="numeric"
      label="Source Width"
      @input="handleChange(types.inputWidth)"
    />
    <TextInput
      v-model="inputHeight"
      inputmode="numeric"
      label="Source Height"
      @input="handleChange(types.inputHeight)"
    />
    <TextInput
      v-model="outputWidth"
      inputmode="numeric"
      label="Source Width"
      @input="handleChange(types.outputWidth)"
    />
    <TextInput
      v-model="outputHeight"
      inputmode="numeric"
      label="Source Height"
      @input="handleChange(types.outputHeight)"
    />
    <p v-if="ratio">Ratio: {{ ratio }}</p>
  </div>
</template>

<style scoped></style>
