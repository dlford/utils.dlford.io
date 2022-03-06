<script setup>
import { ref, computed } from 'vue';
import TextInput from '../components/TextInput.vue';

const types = {
  inputWidth: 'Source Width',
  inputHeight: 'Source Height',
  outputWidth: 'Output Width',
  outputHeight: 'Output Height',
};

const inputWidth = ref('1024');
const inputHeight = ref('768');
const outputWidth = ref('1920');
const outputHeight = ref('1440');
const isError = ref(false);
const ratio = ref(0);

const displayRatio = computed(() => {
  function reduce(numerator, denominator) {
    var gcd = function gcd(a, b) {
      return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(numerator, denominator);
    return [numerator / gcd, denominator / gcd];
  }

  if (
    !Number.isNaN(inputWidth.value || NaN) &&
    !Number.isNaN(inputHeight.value || NaN)
  ) {
    return reduce(inputWidth.value, inputHeight.value).join(':');
  }

  return 'Unknown';
});

function checkInputs() {
  let message = [];

  const checks = [
    { type: types.inputWidth, value: inputWidth.value },
    { type: types.inputHeight, value: inputHeight.value },
    { type: types.outputWidth, value: outputWidth.value },
    { type: types.outputHeight, value: outputHeight.value },
  ];

  for (const check of checks) {
    if (Number.isNaN(check.value) || check.value === 'NaN')
      check.value = '';
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
  if (
    !checkInputs() ||
    !inputWidth.value ||
    !inputHeight.value ||
    (!outputWidth.value && !outputHeight.value)
  )
    return;

  ratio.value =
    parseFloat(inputHeight.value) / parseFloat(inputWidth.value);

  switch (type) {
    case types.inputWidth:
    case types.inputHeight:
      if (!outputWidth.value) {
        outputWidth.value = String(
          parseFloat(outputHeight.value) / ratio.value,
        );
        break;
      }
      outputHeight.value = String(
        parseFloat(outputWidth.value) * ratio.value,
      );
      break;
    case types.outputWidth:
      outputHeight.value = String(
        parseFloat(outputWidth.value) * ratio.value,
      );
      break;
    case types.outputHeight:
      outputWidth.value = String(
        parseFloat(outputHeight.value) / ratio.value,
      );
      break;
    default:
      break;
  }
}
</script>

<template>
  <div>
    <h2>Aspect Ratio Calculator</h2>
    <p class="tag">
      <span class="tag-label"> Aspect Ratio </span>
      {{ displayRatio }}
    </p>
    <div class="form">
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
        label="Target Width"
        @input="handleChange(types.outputWidth)"
      />
      <TextInput
        v-model="outputHeight"
        inputmode="numeric"
        label="Target Height"
        @input="handleChange(types.outputHeight)"
      />
    </div>
    <p v-if="isError" class="error"> Error: {{ isError }} </p>
  </div>
</template>

<style scoped>
.form {
  justify-content: center;
  max-width: 100;
  display: grid;
  grid-template-columns: repeat(2, 45%);
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  gap: 0 2rem;
}

.tag {
  display: inline-block;
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  width: auto;
  border: 2px solid var(--black);
  margin: 0 auto 0.75rem;
  background-color: var(--primary-dark);
}

.tag-label {
  background-color: var(--black);
  padding: 0.25rem;
  margin-left: -0.5rem;
  padding-left: 0.5rem;
  margin-right: 0.5rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

@media (min-width: 40em) {
  .form {
    grid-template-columns: repeat(2, 12rem);
  }
}
</style>
