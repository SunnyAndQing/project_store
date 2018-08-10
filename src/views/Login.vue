<template>
  <div class="login-wrapper">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formData">
      <h3>用户登录</h3>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input @keyup.enter.native="handleLogin" type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-login" type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 导入axios
// import axios from 'axios';
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async handleLogin () {
      // console.log(this.formData);
      var response = await this.$http.post('login', this.formData);
      console.log(response);
      var {data: {meta: {msg, status}}} = response;
      if (status === 200) {
        // 如果登录成功
        this.$message.success(msg);
        // 登录成功要记录token
        // var {data: {data: {token}}} = response;
        var {data: {data: {token}}} = response;
        sessionStorage.setItem('token', token);
        // 跳转home页
        this.$router.push('/');
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>
<style scoped>
.login-wrapper {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrapper .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrapper .login-form .btn-login {
  width: 100%;
}
</style>
