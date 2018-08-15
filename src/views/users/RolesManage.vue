<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-row>
      <el-col :span="24">
        <el-button
          plain
          style="margin-top: 5px">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 角色列表部分 -->
    <el-card>
      <el-table
        border
        :data="rolesData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 外部一行两列 -->
            <!-- {{scope.row}} -->
            <el-row
              v-for="item in scope.row.children"
              :key="item.id">
              <!-- 一级第一列 -->
              <el-col :span="4">
                <el-tag
                  closable
                  @close="handleDelete(scope, item.id)">
                  {{item.authName}}
                </el-tag>
              </el-col>
              <!-- 一级第二列 -->
              <el-col :span="20">
                <el-row
                  v-for="item1 in item.children"
                  :key="item1.id">
                  <!-- 二级第一列 -->
                  <el-col :span="4">
                    <el-tag
                      closable
                      type="success"
                       @close="handleDelete(scope, item1.id)">
                      {{item1.authName}}
                    </el-tag>
                  </el-col>
                  <!-- 二级第二列 -->
                  <el-col
                    :span="20">
                    <el-tag
                      class="tag-item2"
                      closable
                      type="warning"
                      v-for="item2 in item1.children"
                      :key="item2.id"
                      @close="handleDelete(scope, item2.id)">
                      {{item2.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色描述"
          width="300">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              plain></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              plain></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              size="mini"
              plain></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rolesData: []
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    // 加载表格数据
    async loadData () {
      const response = await this.$http.get('roles');
      console.log(response);
      const {data, meta: {msg, status}} = response.data;
      if (status === 200) {
        this.rolesData = data;
      } else {
        this.$message.error(msg);
      }
    },
    // 删除指定角色的指定权限
    async handleDelete (scope, rightId) {
      // 获取角色id和要删除的权限id
      var roleId = scope.row.id;
      // console.log(roleId, rightId);
      const response = await this.$http.delete(`roles/${roleId}/rights/${rightId}`);
      const {data, meta: {msg, status}} = response.data;
      if (status === 200) {
        this.$message.success(msg);
        scope.row.children = data;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style scope>
.el-breadcrumb {
  background-color: #d3dce6;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
}
.el-tag {
  margin-bottom: 10px;
}
.tag-item2 {
  margin-right: 5px;
}
</style>
