<template>
  <el-card>
    <el-table :data="skuArr" border>
      <el-table-column label="序号" type="index" align="center" width="80px" />
      <el-table-column
        show-overflow-tootip
        label="名称"
        align="center"
        width="150px"
        prop="skuName" />
      <el-table-column
        show-overflow-tootip
        label="描述"
        align="center"
        prop="skuDesc" />
      <el-table-column label="图片" width="150px" align="center">
        <template #="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量"
        width="150px"
        align="center"
        prop="weight" />
      <el-table-column label="价格" width="150px" align="center" prop="price" />
      <el-table-column label="操作" width="300px" fixed="right">
        <template #="{ row }">
          <el-button
            :type="row.isSale === 0 ? 'info' : 'primary'"
            size="small"
            :icon="row.isSale === 0 ? 'Top' : 'bottom'"
            @click="updateSale(row)"></el-button>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="info" size="small" icon="InfoFilled"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-model:page="page"
      v-model:limit="limit"
      :page-sizes="pageSizes"
      :total="total"
      :disabled="listLoading"
      :updateData="getHasSku"
      style="margin: 5px 0" />
  </el-card>
</template>

<script setup lang="ts">
import { reqCancelSale, reqHasSku, reqSaleSku } from "@/api/product/sku";
import type { SkuResponseData, SkuData } from "@/api/product/sku/type";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const listLoading = ref<boolean>(false); // 加载状态
let page = ref<number>(1); // 查询数据页码
let limit = ref<number>(5); // 查询每页条数
let pageSizes = ref<number[]>([5, 10, 20, 30, 40]); // 表格分页，每夜条数筛选
let total = ref<number>(0); // 表格数据总数
let skuArr = ref<SkuData[]>([]); //

onMounted(() => {
  getHasSku();
});

// 获取已有的Sku
const getHasSku = async () => {
  listLoading.value = true;
  let result: SkuResponseData = await reqHasSku(page.value, limit.value);
  if (result.code === 200) {
    total.value = result.data.total;
    skuArr.value = result.data.records;
    listLoading.value = false;
  }
};

// 上架或下架的按钮点击回调
const updateSale = async (row: SkuData) => {
  console.log(row);
  // 当前商品isSale === 1，说明当前商品处于上架状态，需要下架，反之则调换
  if (row.isSale === 1) {
    let result: any = await reqCancelSale(row.id as number);
    if (result.code === 200) {
      ElMessage.success("下架成功");
      getHasSku();
    }
  } else {
    let result: any = await reqSaleSku(row.id as number);
    if (result.code === 200) {
      ElMessage.success("上架成功");
      getHasSku();
    }
  }
};
</script>

<style lang="scss" scoped></style>
