<script setup>
import { ref } from 'vue';
import tools from '../tools';

const currentTool = ref(tools[0]);
const showMenu = ref(false);

function changeTool(tool) {
  currentTool.value = tool;
}

function toggleNav() {
  showMenu.value = !showMenu.value;
}
</script>

<template>
  <div class="outer">
    <button class="burger" @click="toggleNav">Menu</button>
    <ul :class="!!showMenu ? 'nav active' : 'nav'">
      <li
        v-for="tool in tools"
        :key="tool.title"
        @click="changeTool(tool)"
      >
        {{ tool.title }}
      </li>
    </ul>
    <div class="tool">
      <keep-alive>
        <component :is="currentTool.payload" />
      </keep-alive>
    </div>
  </div>
</template>

<style scoped>
.outer {
  height: 100vh;
  max-height: 100%;
  display: grid;
  grid-template-areas:
    'header burger'
    'tool tool';
  grid-template-columns: 1fr 3rem;
  grid-template-rows: 3rem 1fr;
}
.burger {
  grid-area: burger;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #eee;
}
.nav {
  display: none;
  flex-direction: column;
  list-style-type: none;
}
.nav.active {
  display: flex;
}
.tool {
  grid-area: tool;
  display: flex;
  justify-content: center;
  align-items: start;
  margin-top: 3rem;
}
</style>
