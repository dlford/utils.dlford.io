<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['input:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('input:modelValue', val);
  },
});
</script>

<template>
  <label>
    {{ label }}
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<style scoped></style>
