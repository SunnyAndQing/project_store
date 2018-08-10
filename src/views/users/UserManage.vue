<template>
  <div class="root">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchrow">
      <el-col :span="24">
        <el-input v-model="inputKey" placeholder="请输入内容" class="searchtext">
        <el-button icon="el-icon-search" slot="append"></el-button>
        </el-input>
        <el-button type="success"
          plain
          @click="addDialogTableVisible = true">
          添加用户</el-button>
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
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加对话框 -->
    <!-- 通过给表单设置ref属性,就可以操作DOM对象 -->
    <el-dialog title="添加用户" :visible.sync="addDialogTableVisible">
      <!-- :rules="rules" -->
      <el-form
        :model="form"
        ref="form">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  data () {
    return {
      inputKey: '',
      userData: [],
      pageSize: 2,
      pageNumber: 1,
      total: 0,
      // 添加用户对话框是否显示属性
      addDialogTableVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    // 加载表格数据
    async loadData () {
      // 获取token
      var token = sessionStorage.getItem('token');
      // 将token设置到请求头的参数内
      this.$http.defaults.headers.common['Authorization'] = token;
      // 发送axios请求获取数据
      var response = await this.$http.get(`users?pagenum=${this.pageNumber}&pagesize=${this.pageSize}&query=${this.inputKey}`);
      var {data: {meta: {msg, status}}} = response;
      var {data: {data}} = response;
      if (status === 200) {
        this.total = response.data.data.total;
        this.userData = data.users;
      } else {
        this.$message.error(msg);
      }
    },
    // 点击每页显示几条数据按钮触发事件
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.loadData();
    },
    // 点击页码触发事件
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.pageNumber = val;
      this.loadData();
    },
    // 点击确认添加按钮触发事件
    async handleAddUser () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.addDialogTableVisible = false;
          // 发送post请求，像数据库提交数据
          var response = await this.$http.post('/users', this.form);
          console.log(response, '添加用户');
          const {meta: {msg, status}} = response.data;
          if (status === 201) {
            this.$message.success('添加用户成功!');
            this.loadData();
          } else {
            this.$message.error(msg);
          }
          // this.$refs.form.resetFields();
          // for (var key in this.form) {
          //   this.form[key] = '';
          // }
        } else {
          this.$message.error('表单校验失败!');
        }
      });
    },
    handleCancel () {
      this.addDialogTableVisible = false;
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style scoped>
.root {
  height: 100%;
}
/* .card {
  height: 100%;
} */
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
