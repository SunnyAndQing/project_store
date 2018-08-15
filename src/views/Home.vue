<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div>
            <img src="@/assets/logo.png" alt="">
          </div>
        </el-col>
        <el-col :span="19"><h2 class="title">电商后台管理系统</h2></el-col>
        <el-col :span="1"><div class="logout"><a @click.prevent="handleLogout" href="#">退出</a></div></el-col>
      </el-row>
    </el-header>
  <el-container>
    <el-aside class="aside" width="200px">
      <el-menu
        router
        unique-opened
        default-active="users"
        class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/users"><i class="el-icon-menu"></i>用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/roles"><i class="el-icon-menu"></i>角色列表</el-menu-item>
            <el-menu-item index="/rights"><i class="el-icon-menu"></i>权限列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/goods"><i class="el-icon-menu"></i>商品列表</el-menu-item>
            <el-menu-item index="/category"><i class="el-icon-menu"></i>分类参数</el-menu-item>
            <el-menu-item index="/goods/catogory"><i class="el-icon-menu"></i>商品分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="orders"><i class="el-icon-menu"></i>订单列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="datas"><i class="el-icon-menu"></i>数据报表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <!-- 路由占位 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
// 导入axios
// import axios from 'axios';
export default {
  beforeCreate () {
    var token = sessionStorage.getItem('token');
    if (!token) {
      this.$message.warning('请先去登录！');
      this.$router.push('/login');
    }
  },
  methods: {
    handleLogout () {
      console.log('退出');
      this.$message.success('退出成功！');
      // window.sessionStorage.clear();
      window.sessionStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.header .title,
.header .logout {
  text-align: center;
  line-height: 60px;
}
.header .title {
  color: #fff;
}
.header .logout a {
  position: absolute;
  right: 10px;
  text-decoration: none;
  color: orange;
}
.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
}
</style>
