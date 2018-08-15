<template>
  <div class="root">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchrow">
      <el-col :span="24">
        <el-input v-model="inputKey" placeholder="请输入内容" class="searchtext" clearable>
        <el-button @click="searchUser" icon="el-icon-search" slot="append"></el-button>
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
              inactive-color="#ff4949"
              @change="handleUserStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作"
          width="280">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              plain
              @click="handleEdit(scope.row)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              plain
              @click="handleDeleteUser(scope.row.id)"></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              size="mini"
              plain
              @click="handleSetRolesOptionDialog(scope.row)"></el-button>
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
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogTableVisible"
      @close="handleDialogClose">
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
    <!-- 编辑对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogTableVisible"
      @close="handleDialogClose">
      <!-- :rules="rules" -->
      <el-form
        :model="form"
        :rules="rules"
        ref="form">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="form.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="confirmEditUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="rolesDialogVisible"
      width="50%">
      <!-- :before-close="handleClose" -->
      <!-- <span>这是一段信息</span> -->
      <el-form  label-width="100px">
        <el-form-item label="当前用户">
          <!-- <el-input v-model="formLabelAlign.name"></el-input> -->
          {{ currentName }}
        </el-form-item>
        <el-form-item label="请选择角色">
          <el-select v-model="currentRoleId">
            <el-option label="请选择角色" :value="-1" disabled></el-option>
            <el-option
              v-for="item in rolesData"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSetRole">确 定</el-button>
      </span>
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
      // 编辑用户对话框是否显示属性
      editDialogTableVisible: false,
      // 分配角色对话框是否显示属性
      rolesDialogVisible: false,
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
      },
      // 角色数据
      rolesData: [],
      currentName: '',
      currentUserId: -1,
      currentRoleId: -1
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    // 加载表格数据
    async loadData () {
      // // 获取token
      // var token = sessionStorage.getItem('token');
      // // 将token设置到请求头的参数内
      // this.$http.defaults.headers.common['Authorization'] = token;
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
    searchUser () {
      this.loadData();
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
    // 点击取消按钮触发事件
    handleCancel () {
      this.addDialogTableVisible = false;
      this.editDialogTableVisible = false;
      this.$refs.form.resetFields();
      // 3.清空表单样式及表单数据
      for (var key in this.form) {
        this.form[key] = '';
      }
    },
    // 点击编辑按钮触发的事件
    handleEdit (user) {
      console.log(user, 'user');
      // 1.选中行用户数据，添加到表单上
      this.form.username = user.username;
      this.form.email = user.email;
      this.form.mobile = user.mobile;
      // 为发送请求时保存id
      this.form.id = user.id;
      // 2.将编辑对话框显示出来
      this.editDialogTableVisible = true;
    },
    // 点击编辑对话框确认按钮触发的事件
    async confirmEditUser () {
      // 1.校验表单
      // 2.发送put请求，提交修改数据
      const response = await this.$http.put(`users/${this.form.id}`, {email: this.form.email, mobile: this.form.mobile});
      console.log(response, '修改');
      var {meta: {msg, status}} = response.data;
      if (status === 200) {
        this.editDialogTableVisible = false;
        this.$message.success('修改成功！');
        this.loadData();
      } else {
        this.$message.error(msg);
      }
      // 3.清空表单样式及表单数据
      for (var key in this.form) {
        this.form[key] = '';
      }
    },
    // 点击编辑对话框close按钮触发的事件
    handleDialogClose () {
      // 清空表单上的数据
      for (var key in this.form) {
        this.form[key] = '';
      }
    },
    // 点击删除按钮触发的事件
    async handleDeleteUser (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const response = await this.$http.delete(`users/${id}`);
        const {meta: {msg, status}} = response.data;
        if (status === 200) {
          // this.$message.success('删除成功！');
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loadData();
        } else {
          this.$message.error(msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 点击用户状态按钮触发的事件
    async handleUserStatus (user) {
      var response = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      // console.log(response, 'status');
      const {meta: {msg, status}} = response.data;
      status === 200 ? this.$message.success(msg) : this.$message.error(msg);
    },
    // 点击设置用户角色按钮触发的事件
    async handleSetRolesOptionDialog (user) {
      this.rolesDialogVisible = true;
      // 因为确认用户角色接口需要用户id和角色id,所以需要存储一下
      this.currentName = user.username;
      this.currentUserId = user.id;
      // console.log(user, 'user');

      // 发送请求，获取角色列表
      var response = await this.$http.get('roles');
      // console.log(response, 'roles');
      const {data: {data, meta: {msg, status}}} = response;
      console.log(data, '角色');
      if (status === 200) {
        console.log(msg);
        this.rolesData = data;
        this.currentRoleId = data.id;
      }

      // 获取角色id
      var userInfo = await this.$http.get(`users/${this.currentUserId}`);
      console.log(userInfo, '用户信息');
      const {data: {rid}} = userInfo.data;
      this.currentRoleId = rid;
    },
    // 点击确认设置角色按钮触发的事件
    async confirmSetRole () {
      var response = await this.$http.put(`users/${this.currentUserId}/role`, {
        rid: this.currentRoleId
      });
      // console.log(response, '确认');
      const {meta: {msg, status}} = response.data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
      this.rolesDialogVisible = false;
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
