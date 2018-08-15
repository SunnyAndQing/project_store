import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
// 导入Login.vue组件
import Login from '@/views/Login';
import Home from '@/views/Home';
import UserManage from '@/views/users/UserManage';
import RightManage from '@/views/users/RightsManage';
import RolesManage from '@/views/users/RolesManage';
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
        },
        {
          path: '/rights',
          name: 'rights',
          component: RightManage
        },
        {
          path: '/roles',
          name: 'roles',
          component: RolesManage
        }
      ]
    }
  ]
});
