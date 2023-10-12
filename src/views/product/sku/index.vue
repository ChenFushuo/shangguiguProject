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
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateSku"></el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"></el-button>
          <el-popconfirm
            :title="`你确定删除这个${row.skuName}吗?`"
            width="200px"
            @confirm="deleteSku(row)">
            <template #reference>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                title="删除SKU"></el-button>
            </template>
          </el-popconfirm>
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
    <!-- 抽屉组件，展示商品详情 -->
    <el-drawer
      v-model="drawer"
      title="查看商品详情"
      :before-close="handleClose">
      <template #header> </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin: 5px"
              >{{ item.valueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              style="margin: 5px"
              >{{ item.saleAttrValueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id">
                <img :src="item.imgUrl" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import {
  reqCancelSale,
  reqHasSku,
  reqRemoveSku,
  reqSaleSku,
  reqSkuInfo,
} from "@/api/product/sku";
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from "@/api/product/sku/type";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const listLoading = ref<boolean>(false); // 加载状态
let page = ref<number>(1); // 查询数据页码
let limit = ref<number>(5); // 查询每页条数
let pageSizes = ref<number[]>([5, 10, 20, 30, 40]); // 表格分页，每夜条数筛选
let total = ref<number>(0); // 表格数据总数
let skuArr = ref<SkuData[]>([]); // sku表格数据
let drawer = ref<boolean>(false); // 控制抽屉是否显示
let skuInfo = ref<any>({}); // sku详情抽屉展示

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

//更新已有的SKU
const updateSku = () => {
  ElMessage.success("功能正在开发中……请耐心等候更新……");
};

// 查看商品详情按钮点击回调
const findSku = async (row: SkuData) => {
  let result: SkuInfoData = await reqSkuInfo(row.id as number);
  if (result.code === 200) {
    drawer.value = true;
    skuInfo.value = result.data; // 存储sku详情
  } else {
    ElMessage.error("获取SKU信息失败, 后台接口异常, 请耐心等待修复");
  }
};

// 抽屉关闭回调
const handleClose = () => {
  drawer.value = false;
};

// 删除sku回调
const deleteSku = async (row: SkuData) => {
  let result: any = await reqRemoveSku(row.id as number);
  console.log(result);

  if (result.code === 200) {
    ElMessage.success("删除成功");
    getHasSku();
  } else {
    ElMessage.error("删除失败");
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
