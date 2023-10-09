<template>
  <div>
    <!-- 三级分类组件 -->
    <Category :scene="scene" />

    <el-card style="margin: 10px 0">
      <!-- 场景0展示的结构 -->
      <div v-show="scene === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id === ''"
          @click="addOrEditSpu">
          添加SPU
        </el-button>
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
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="addOrEditSpu(row)"></el-button>
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
      </div>
      <!-- 添加、修改SPU -->
      <SpuForm
        ref="spu"
        v-show="scene === 1"
        @changeScene="changeScene"></SpuForm>
      <!-- 添加、修改SKU -->
      <SkuForm v-show="scene === 2"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { HasSpuResponseData, Records, SpuData } from "@/api/product/spu/type";
import { reqHasSpu } from "@/api/product/spu/index";
import useCategoryStore from "@/store/modules/category";
import { ref, watch } from "vue";
// 引入子组件
import SkuForm from "./components/SkuForm.vue";
import SpuForm from "./components/SpuForm.vue";

const listLoading = ref<boolean>(false); // 加载状态
let page = ref<number>(1); // 查询数据页码
let limit = ref<number>(3); // 查询每页条数
let total = ref<number>(0); // 表格数据总数
let scene = ref<number>(0); // 0展示已有SPU，1展示添加或者修改SPU的结构
let categoryStore = useCategoryStore();
let records = ref<Records>([]); // 存出已有的SPU属性
let spu = ref<any>();
// 监听三级分类ID的变化
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
const addOrEditSpu = (row: SpuData) => {
  // 场景切换  0 1
  scene.value = 1;
  if (!row.id) {
  } else {
    // 调用子组件实例方法，获取完整的已有SPU数据
    spu.value.initHasSpuData(row);
  }
};
// 子组件自定义事件
const changeScene = (num: number) => {
  scene.value = num;
};
</script>

<style lang="scss" scoped></style>
