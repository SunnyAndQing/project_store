// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 配置element-ui第三方组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
import moment from 'moment';
import axios from 'axios';
// 配置element-ui
Vue.use(ElementUI);

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.filter('formatDate', (value, ftmString) => {
  return moment(value).format(ftmString);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
