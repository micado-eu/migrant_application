import Vue from 'vue'
import VueMermaid from "vue-mermaid"

//Vue.use(VueCytoscape)
Vue.use(VueMermaid);


import { Icon } from 'leaflet'

import 'leaflet/dist/leaflet.css'

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

import Countly from 'countly-sdk-web';
import VueCountly from 'vue-countly';

Vue.use(VueCountly, Countly, {
  app_key: 'ef7879ac3b3a064c106d5fa27ba2f70603b8c2da',
  url: 'https://monitoring.micadoproject.eu',
});

console.log(Vue.Countly === Countly);
