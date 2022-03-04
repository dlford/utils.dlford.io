<script setup>
import { ref } from 'vue';
import TextareaInput from '../components/TextareaInput.vue';

const json = ref('');
const formatted = ref('');
const isError = ref('');

const errorRegex = /line ([0-9]+) column ([0-9]+)/;

function handleChange() {
  if (!json.value) {
    formatted.value = '';
    return;
  }

  try {
    const data = JSON.parse(json.value);
    formatted.value = JSON.stringify(data, null, 2);
    isError.value = false;
  } catch (e) {
    isError.value = e.message;
    formatted.value = '';
    const result = errorRegex.exec(e.message);
    if (result) {
      const lineNumber = result[1];
      const columnNumber = result[2];
      const lines = json.value.split('\n');
      let output = '';
      for (const index in lines) {
        const line = lines[index];
        if (+index + 1 === +lineNumber) {
          let markedLine = '';
          for (const letterIndex in line) {
            const letter = line[letterIndex];
            if (+letterIndex + 1 === +columnNumber) {
              markedLine += `<span class="bad-letter">${letter}</span>`;
            } else {
              markedLine += letter;
            }
          }
          output += `<span class="bad-line">${markedLine}</span>\n`;
        } else {
          output += `${line}\n`;
        }
      }
      formatted.value = output;
    }
  }
}
</script>

<template>
  <div>
    <h2>JSON Format / Validate</h2>
    <TextareaInput
      v-model="json"
      label="Input"
      @input="handleChange"
    />
    <label>Formatted</label>
    <pre class="output" v-html="formatted" />
    <p v-if="!!isError" class="error">
      {{ isError }}
    </p>
  </div>
</template>

<style scoped>
.output {
  background-color: var(--primary-dark);
  min-height: 9ch;
  resize: both;
  overflow: auto;
  margin: -0.75rem 0 1rem;
  height: 100%;
  font-family: var(--font-mono);
  font-size: 1.1042rem;
}
.output :deep(.bad-line) {
  background-color: rgba(255, 0, 0, 0.5);
}
.output :deep(.bad-letter) {
  color: red;
  background-color: black;
}
</style>
