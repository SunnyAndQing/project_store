<template>
  <div class="root">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchrow">
      <el-col :span="24">
        <el-input v-model="input" placeholder="请输入内容" class="searchtext">
        <el-button icon="el-icon-search" slot="append"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-card class="card">
      <el-table
        :data="userData"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="120">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="180">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatDate('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="状态"
          width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作"
          width="280">
          <template slot-scope="scope">
           <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
           <el-button type="danger" icon="el-icon-message" size="mini" plain></el-button>
           <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  data () {
    return {
      input: '',
      userData: []
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    async loadData () {
      // 获取token
      var token = sessionStorage.getItem('token');
      // 将token设置到请求头的参数内
      this.$http.defaults.headers.common['Authorization'] = token;
      // 发送axios请求获取数据
      var response = await this.$http.get('users?pagenum=1&pagesize=10');
      var {data: {meta: {msg, status}}} = response;
      var {data: {data}} = response;
      if (status === 200) {
        this.userData = data.users;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style scoped>
.root {
  height: 100%;
}
.card {
  height: 100%;
}
.el-breadcrumb {
     background-color: #d3dce6;
    height: 45px;
    font-size: 15px;
    padding-left: 10px;
    line-height: 45px;
}
.searchtext {
  width: 300px;
}
</style>
