<script setup>
import { ref } from 'vue';
import TextInput from '../components/TextInput.vue';

const types = {
  inputWidth: 'Source Width',
  inputHeight: 'Source Height',
  outputWidth: 'Output Width',
  outputHeight: 'Output Height',
};

const inputWidth = ref('');
const inputHeight = ref('');
const outputWidth = ref('');
const outputHeight = ref('');
const isError = ref(false);
const ratio = ref('');

function checkInputs() {
  let message = [];

  const checks = [
    { type: types.inputWidth, value: inputWidth.value },
    { type: types.inputHeight, value: inputHeight.value },
    { type: types.outputWidth, value: outputWidth.value },
    { type: types.outputHeight, value: outputHeight.value },
  ];

  for (const check of checks) {
    if (!!check.value && !/^\d+\.?(\d+)?$/.test(check.value)) {
      message.push(`${check.type} is not a number`);
    }
  }

  if (message.length) {
    isError.value = message.join(', ');
    return false;
  }

  isError.value = false;
  return true;
}

function handleChange(type) {
  if (!checkInputs()) return;

  switch (type) {
    case types.inputWidth:
      break;
    case types.inputHeight:
      break;
    case types.outputWidth:
      break;
    case types.outputHeight:
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
      label="Output Width"
      @input="handleChange(types.outputWidth)"
    />
    <TextInput
      v-model="outputHeight"
      inputmode="numeric"
      label="Output Height"
      @input="handleChange(types.outputHeight)"
    />
    <p v-if="ratio">Ratio: {{ ratio }}</p>
    <p v-if="isError" class="error"> Error: {{ isError }} </p>
  </div>
</template>

<style scoped></style>
