import axios from 'axios';

const MyAxios = {};
MyAxios.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

  // 设置请求时的拦截器
  // 发送请求之前，判断当前请求是否是登录，如果是不是登录，
  // 设置请求头中的Authorization属性
  axios.interceptors.request.use(function (config) {
    // 想判断是否是登录，需要获取url，打印config参数，查看有没有url和请求头属性
    if (config.url !== 'login') {
      const token = sessionStorage.getItem('token');
      config.headers.Authorization = token;
    }
    // console.log(config.url);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  Vue.prototype.$http = axios;
};
export default MyAxios;
