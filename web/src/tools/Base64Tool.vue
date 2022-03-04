<script setup>
import { ref } from 'vue';
import { encode, decode } from 'js-base64';
import TextareaInput from '../components/TextareaInput.vue';

const ascii = ref('');
const base64 = ref('');
const isError = ref(false);

function convertToAscii(value = base64.value) {
  try {
    isError.value = false;
    ascii.value = decode(value);
  } catch (e) {
    isError.value = true;
  }
}

function convertToBase64(value = ascii.value) {
  isError.value = false;
  base64.value = encode(value);
}
</script>

<template>
  <div>
    <h2>Base64 Encode / Decode</h2>
    <TextareaInput
      v-model="ascii"
      label="ASCII"
      @input="convertToBase64(ascii.value)"
    />
    <TextareaInput
      v-model="base64"
      label="Base64"
      @input="convertToAscii(base64.value)"
    />
    <p v-if="isError" class="error">
      Unable to decode - Invalid character
    </p>
  </div>
</template>
