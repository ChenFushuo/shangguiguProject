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
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

let pageNo = ref<number>(1);
let pageSize = ref<number>(5);
let small = ref(false);
let background = ref(false);
let disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<style lang="scss" scoped></style>
