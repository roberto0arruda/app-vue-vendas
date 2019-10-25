import Vue from 'vue'
import App from './App'
import router from './router'
import pluginsSistema  from "@/helpers/plugins"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(pluginsSistema);
Vue.use(ElementUI);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
