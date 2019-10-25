import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/AdminLTE-2.4.3/bower_components/bootstrap/dist/css/bootstrap.css'
import '../static/AdminLTE-2.4.3/bower_components/font-awesome/css/font-awesome.css'
import '../static/AdminLTE-2.4.3/bower_components/Ionicons/css/ionicons.css'
import '../static/AdminLTE-2.4.3/dist/css/AdminLTE.css'
import '../static/AdminLTE-2.4.3/dist/css/skins/skin-blue.min.css'

window.$ = window.jQuery = require('jquery');

import pluginsSistema  from "@/helpers/plugins"

Vue.use(pluginsSistema);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
