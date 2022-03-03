import { shallowRef } from 'vue';

import WelcomeTool from './WelcomeTool.vue';
import HomeIcon from '../assets/HomeIcon.vue';
import Base64Tool from './Base64Tool.vue';
import Base64Icon from '../assets/Base64Icon.vue';
import JsonFormatterTool from './JsonFormatterTool.vue';
import JsonIcon from '../assets/JsonIcon.vue';

/* TODO: Icons */

export default [
  {
    title: 'Home',
    payload: shallowRef(WelcomeTool),
    icon: HomeIcon,
  },
  {
    title: 'Base64 Encode/Decode',
    payload: shallowRef(Base64Tool),
    icon: Base64Icon,
  },
  {
    title: 'JSON Formatter',
    payload: shallowRef(JsonFormatterTool),
    icon: JsonIcon,
  },
];
