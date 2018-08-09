import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
// 导入Login.vue组件
import Login from '@/views/Login';
import Home from '@/views/Home';
import UserManage from '@/views/users/UserManage';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/users',
          name: 'users',
          component: UserManage
        }
      ]
    }
  ]
});
