<script setup>
import { ref } from 'vue';
import * as Diff from 'diff';
import TextareaInput from '../components/TextareaInput.vue';

/*
TODO: Icon, diff options, header/filename inputs
https://www.npmjs.com/package/diff
*/

const textA = ref('');
const textB = ref('');
const output = ref('');

const addRegex = /^\+/;
const removeRegex = /^-/;

function handleChange() {
    if (textA.value === '' || textB.value === '') {
      output.value = '';
      return;
    }

    const diff = Diff.createPatch('Text Diff', textA.value, textB.value, 'Text A', 'Text B');
    const lines = diff.split('\n');
    let result = '';

    for (const line of lines) {
      let lineValue;
      if (addRegex.test(line)) {
        lineValue = `<span class="add">${line}</span>`;
      }
      if (removeRegex.test(line)) {
        lineValue = `<span class="remove">${line}</span>`;
      }
      result += `${lineValue || line}\n`;
    }

    output.value = result;
}
</script>

<template>
  <div>
    <h2>Text Diff</h2>
    <TextareaInput
      class="input"
      v-model="textA"
      label="Text A"
      @input="handleChange"
    />
    <TextareaInput
      class="input"
      v-model="textB"
      label="Text B"
      @input="handleChange"
    />
    <label>Result</label>
    <pre class="output" v-html="output" />
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
.output :deep(.add) {
  background-color: rgba(255, 0, 0, 0.25);
}
.output :deep(.remove) {
  background-color: rgba(0, 255, 0, 0.25);
}
</style>
