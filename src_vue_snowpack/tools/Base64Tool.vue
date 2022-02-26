<script>
import TextInput from '../components/TextInput.vue';

export default {
  components: {
    TextInput,
  },
  data: function () {
    return {
      textValue: '',
    };
  },
  computed: {
    replaced() {
      return `value: ${this.textValue}`;
    },
  },
};
</script>

<template>
  <div>
    <TextInput v-model="textValue" label="Input Test" />
    <p>{{ replaced }}</p>
  </div>
</template>

<style scoped></style>
