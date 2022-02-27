import { shallowRef } from 'vue';

import WelcomeTool from './WelcomeTool.vue';
import Base64Tool from './Base64Tool.vue';
import JsonFormatterTool from './JsonFormatterTool.vue';

export default [
  {
    title: 'Home',
    payload: shallowRef(WelcomeTool),
  },
  {
    title: 'Base64 Encode/Decode',
    payload: shallowRef(Base64Tool),
  },
  {
    title: 'JSON Formatter',
    payload: shallowRef(JsonFormatterTool),
  },
];
