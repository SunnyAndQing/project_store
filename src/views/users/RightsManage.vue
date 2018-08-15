<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="el-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- table列表 -->
    <el-card>
      <el-table
        border
        stripe
        :data="rightsData"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="200">
        </el-table-column>
        <el-table-column
          label="层级"
          width="200">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <span v-if="scope.row.level-0 === 0">一级</span>
            <span v-else-if="scope.row.level-0 === 1">二级</span>
            <span v-else>三级</span>
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
      rightsData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    async loadData () {
      const response = await this.$http.get(`rights/list`);
      // console.log(response);
      const {data, meta: {msg, status}} = response.data;
      if (status === 200) {
        this.rightsData = data;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.el-breadcrumb {
  background-color: #d3dce6;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
}
</style>
