<script setup>
/* global emit */

import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  inputmode: {
    type: String,
    default: undefined,
  },
});

defineEmits(['update:modelValue']);

computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
</script>

<template>
  <label>
    {{ label }}
    <input
      :type="type"
      :value="modelValue"
      :inputmode="inputmode"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>
