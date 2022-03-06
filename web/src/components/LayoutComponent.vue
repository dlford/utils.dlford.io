<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import debounce from '../lib/debounce';
import tools from '../tools';
import DlfordLogo from '../assets/DlfordLogo.vue';
import GithubLogo from '../assets/GithubLogo.vue';
import HamburgerIcon from '../assets/HamburgerIcon.vue';

const currentTool = ref(tools[0]);
const showMenu = ref(window.innerWidth >= 640);

function changeTool(tool) {
  currentTool.value = tool;
  if (window.innerWidth < 640) {
    showMenu.value = false;
  }
}

function toggleNav() {
  showMenu.value = !showMenu.value;
}

function handleWidthChange() {
  if (window.innerWidth < 640) {
    showMenu.value = false;
    return;
  }
  showMenu.value = true;
}

const debounceTime = 150;
onMounted(() => {
  ['resize', 'orientationchange'].forEach((name) => {
    window.addEventListener(
      name,
      debounce(handleWidthChange, debounceTime),
    );
  });
});

onBeforeUnmount(() => {
  ['resize', 'orientationchange'].forEach((name) => {
    window.removeEventListener(
      name,
      debounce(handleWidthChange, debounceTime),
    );
  });
});
</script>

<template>
  <main :class="!!showMenu ? 'outer menu-open' : 'outer'">
    <header class="header" aria-hidden="true">
      <div class="inner">
        <a
          href="https://www.dlford.io"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open dlford.io"
        >
          <DlfordLogo />
        </a>
        <h1>Utilities</h1>
      </div>
    </header>
    <button
      class="burger"
      aria-label="Open Main Navigation"
      :aria-expanded="!!showMenu"
      @click="toggleNav"
    >
      <HamburgerIcon />
    </button>
    <nav
      :class="!!showMenu ? 'nav active' : 'nav'"
      :aria-hidden="!showMenu"
      aria-label="Main Navigation"
      aria-role="navigation"
    >
      <ul>
        <li
          v-for="tool in tools"
          :key="tool.title"
          :title="tool.title"
          tabindex="0"
          @click="changeTool(tool)"
          @keydown.enter="changeTool(tool)"
        >
          <span v-if="!!tool.icon" class="icon">
            <component :is="tool.icon" />
          </span>
          <span class="title">
            {{ tool.title }}
          </span>
        </li>
      </ul>
    </nav>
    <section aria-label="Active Tab" class="tool">
      <keep-alive>
        <component :is="currentTool.payload" />
      </keep-alive>
    </section>
    <footer class="footer" aria-label="Footer">
      <p>
        CopyLeft DL Ford
        {{ new Date().getFullYear() }}
      </p>
      <a
        href="https://github.com/dlford/utils.dlford.io"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View source on GitHub"
      >
        <GithubLogo />
      </a>
    </footer>
  </main>
</template>

<style scoped>
.outer {
  --header-height: 3rem;
  height: 100vh;
  max-height: 100%;
  display: grid;
  grid-template-areas:
    'header burger'
    'tool tool'
    'footer footer';
  grid-template-columns: 1fr var(--header-height);
  grid-template-rows: var(--header-height) 1fr var(--header-height);
}
.header {
  grid-area: header;
  width: 100%;
  height: 100%;
  background-color: var(--primary-dark);
  display: flex;
  align-items: center;
  z-index: 1;
}
.header .inner {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  padding-left: 0.25rem;
}
.header a {
  display: flex;
  align-items: center;
  padding: 0.25rem;
}
.header h1 {
  font-size: 1.2292rem;
  padding: 0;
}
.burger {
  grid-area: burger;
  background-color: var(--primary-dark);
  border: none;
  cursor: pointer;
  color: #eee;
  z-index: 1;
}
.nav {
  --padding: 1rem;
  transform: translateY(calc(-100% - var(--header-height)));
  transition: transform 150ms ease-in-out;
  position: absolute;
  top: var(--header-height);
  left: 0;
  margin: 0;
  padding: var(--padding);
  background-color: var(--primary-dark);
  width: calc(100% - (var(--padding) * 2));
  height: calc(100% - var(--header-height) - (var(--padding) * 2));
  overflow-y: auto;
}
.nav.active {
  transform: translateY(0);
}
.nav ul {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.nav li {
  padding: 0.5rem 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.nav li .icon {
  display: inline-block;
}
.nav li .icon svg {
  width: 18px;
  height: 18px;
}
.tool {
  grid-area: tool;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 1rem;
  width: calc(100% - 2rem);
}
.tool > * {
  width: 100%;
}
.footer {
  grid-area: footer;
  background-color: var(--primary-dark);
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
}
.footer p {
  padding: 0;
}
.footer a {
  color: var(--white);
  display: flex;
  justify-content: center;
  padding: 0.25rem;
}
@media (min-width: 40em) {
  .outer {
    grid-template-areas: 'header header' 'nav tool' 'footer footer';
    grid-template-columns: minmax(2.75rem, 2.75rem) 1fr;
    grid-template-rows: var(--header-height) 1fr var(--header-height);
    transition: grid-template-columns 150ms ease-in-out;
  }
  .outer.menu-open {
    grid-template-columns: minmax(10rem, 20vw) 1fr;
  }
  .outer:not(.menu-open) .nav .title {
    visibility: hidden;
    overflow: hidden;
    white-space: nowrap;
  }
  .burger {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
  }
  .nav {
    grid-area: nav;
    transform: none;
    transition: none;
    position: relative;
    height: calc(100% - (var(--padding) * 2));
    overflow-x: hidden;
    top: 0;
  }
  .header {
    justify-content: center;
  }
  .tool {
    justify-content: center;
    align-items: center;
  }
  .tool > * {
    width: auto;
  }
}
</style>
