<template>
  <div>
    <el-card class="form_card">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default">搜索</el-button>
          <el-button type="primary" size="default">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="pagemain_card">
      <el-button type="primary" size="default" icon="Plus">添加用户</el-button>
      <el-button type="primary" size="default" icon="Delete"
        >批量删除</el-button
      >
      <!-- table展示用户信息 -->
      <el-table :data="userArr" border style="margin: 10px 0">
        <el-table-column type="selection" align="center" />
        <el-table-column label="#" align="center" />
        <el-table-column label="ID" align="center" prop="id" />
        <el-table-column label="用户名字" align="center" prop="username" />
        <el-table-column label="用户名称" align="center" prop="name" />
        <el-table-column
          show-overflow-tooltip
          label="用户角色"
          align="center"
          prop="roleName" />
        <el-table-column
          show-overflow-tooltip
          label="创建时间"
          align="center"
          prop="createTime" />
        <el-table-column
          show-overflow-tooltip
          label="更新时间"
          align="center"
          prop="updateTime" />
        <el-table-column label="操作" width="300" align="center">
          <template #="{ row }">
            <el-button type="primary" size="small" icon="User">
              分配角色
            </el-button>
            <el-button type="primary" size="small" icon="Edit">编辑</el-button>
            <el-button type="primary" size="small" icon="Delete">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-model:page="page"
        v-model:limit="limit"
        :page-sizes="pageSizes"
        :updateData="getHasUser"
        :total="total"
        :disabled="listLoading" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqUserInfo } from "@/api/acl/user";
import { UserResponseData, Records } from "@/api/acl/user/type";
import { onMounted, ref } from "vue";

const listLoading = ref<boolean>(false);
let page = ref<number>(1); // 查询数据页码
let limit = ref<number>(5); // 查询每页条数
let pageSizes = ref<number[]>([5, 10, 20, 30, 40]); // 表格分页，每夜条数筛选
let total = ref<number>(0); // 表格数据总数
let userArr = ref<Records>(); // 存储全部用户数据

onMounted(() => {
  getHasUser();
});

const getHasUser = async () => {
  let result: UserResponseData = await reqUserInfo(page.value, limit.value);
  if (result.code === 200) {
    total.value = result.data.total;
    userArr.value = result.data.records;
  }
};
</script>

<style lang="scss" scoped>
.form_card {
  height: 80px;
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.pagemain_card {
  margin: 10px 0;
}
</style>
