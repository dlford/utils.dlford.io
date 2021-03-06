import { shallowRef } from 'vue';

import WelcomeTool from './WelcomeTool.vue';
import HomeIcon from '../assets/HomeIcon.vue';
import AspectRatioTool from './AspectRatioTool.vue';
import AspectRatioIcon from '../assets/AspectRatioIcon.vue';
import UuidTool from './UuidTool.vue';
import UuidIcon from '../assets/UuidIcon.vue';
import Base64Tool from './Base64Tool.vue';
import Base64Icon from '../assets/Base64Icon.vue';
import JsonFormatterTool from './JsonFormatterTool.vue';
import JsonIcon from '../assets/JsonIcon.vue';

export default [
  {
    title: 'Home',
    payload: shallowRef(WelcomeTool),
    icon: HomeIcon,
  },
  {
    title: 'Aspect Ratio Calculator',
    payload: shallowRef(AspectRatioTool),
    icon: AspectRatioIcon,
  },
  {
    title: 'UUID Generator',
    payload: shallowRef(UuidTool),
    icon: UuidIcon,
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
