<template>
  <div>
    <!-- 三级分类组件 -->
    <Category :scene="scene" />

    <el-card style="margin: 10px 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="categoryStore.c3Id === ''"
        >添加SPU</el-button
      >
      <el-table style="margin: 10px 0" border :data="records">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip=""></el-table-column>
        <el-table-column label="SPU操作">
          <template #default="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              title="添加SKU"></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              title="修改SPU"></el-button>
            <el-button
              type="primary"
              size="small"
              icon="View"
              title="查看SKU列表"></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              title="删除SPU"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-model:page="page"
        v-model:limit="limit"
        :total="total"
        :updateData="getHasSpu"
        :disabled="listLoading" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { HasSpuResponseData, Records } from "@/api/product/spu/type";
import { reqHasSpu } from "@/api/product/spu/index";
import useCategoryStore from "@/store/modules/category";
import { ref, watch } from "vue";

const listLoading = ref<boolean>(false); // 加载状态
let page = ref<number>(1); // 查询数据页码
let limit = ref<number>(3); // 查询每页条数
let total = ref<number>(0); // 表格数据总数
let scene = ref<number>(0);
let categoryStore = useCategoryStore();
let records = ref<Records>([]); // 存出已有的SPU属性
// 肩痛三级分类ID的变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 保证有三级分类ID
    if (!categoryStore.c3Id) return;
    getHasSpu();
  }
);
// 获取SPU数据
const getHasSpu = async () => {
  listLoading.value = true;
  let result: HasSpuResponseData = await reqHasSpu(
    page.value,
    limit.value,
    categoryStore.c3Id
  );
  if (result.code === 200) {
    listLoading.value = false;
    records.value = result.data.records;
    total.value = result.data.total;
  }
};
</script>

<style lang="scss" scoped></style>
