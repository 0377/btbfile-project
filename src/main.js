import Vue from 'vue';
import App from './App.vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import router from './router';
import store from './store';
import axios from 'axios';
// qs用于处理post请求失败的问题
import qs from 'qs';
// 引入加载动画插件
import { Indicator } from 'mint-ui';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(MintUI);

axios.defaults.baseURL = 'http://localhost:8083/';

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 如果为post请求则将传输数据json化
    if (config.method == 'post') {
      config.data = qs.stringify(config.data);
    }

    // 加载动画
    Indicator.open();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  error => {
    // 错误提醒
    Indicator.close();
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
