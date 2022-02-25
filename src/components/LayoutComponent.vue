<script>
import tools from '../tools';

export default {
  data: function () {
    return {
      currentTool: tools[0],
      tools,
    };
  },
  methods: {
    changeTool(tool) {
      this.currentTool = tool;
    },
  },
};
</script>

<template>
  <div class="outer">
    <div class="nav">
      <ul>
        <li
          v-for="tool in tools"
          :key="tool.title"
          @click="changeTool(tool)"
        >
          {{ tool.title }}
        </li>
      </ul>
    </div>
    <div class="tool">
      <keep-alive>
        <component :is="currentTool.payload" />
      </keep-alive>
    </div>
  </div>
</template>

<style scoped>
.outer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-height: 100%;
  gap: 2rem;
}
</style>
