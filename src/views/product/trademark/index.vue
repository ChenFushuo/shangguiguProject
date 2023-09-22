<template>
  <el-card class="box-card">
    <!-- 品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格组件，展示已经存在的品牌-列表 -->
    <el-table style="margin: 10px 0" border>
      <el-table-column
        label="序号"
        width="120"
        align="center"></el-table-column>
      <el-table-column label="品牌名称" align="center"></el-table-column>
      <el-table-column label="品牌LOGO" align="center"></el-table-column>
      <el-table-column label="操作" align="center"></el-table-column>
    </el-table>
    <pagination
      v-model:page="listParams.page"
      v-model:limit="listParams.limit"
      :list-count="listCount"
      :load-list="getList"
      :disabled="listLoading" />
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const listCount = ref(40); // 总条数
const listLoading = ref(false);
const listParams = reactive({
  page: 1, // 当前页码
  limit: 10, // 每页条数
}); // 列表数据查询参数
const getList = async () => {
  listLoading.value = true;
  setTimeout(() => {
    listLoading.value = false;
  }, 500);
};
</script>

<style lang="scss" scoped></style>
