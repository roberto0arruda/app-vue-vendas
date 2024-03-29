import Vue from 'vue'
import App from './App'
import router from './router'
import pluginsSistema  from "@/helpers/plugins"
import VMask from 'vue-the-mask'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

Vue.use(pluginsSistema);
Vue.use(ElementUI);
Vue.use(VMask);
Vue.use(require('vue-moment'));

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$urlAPI = 'http://127.0.0.1:8000/api/';

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
