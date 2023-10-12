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
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="addSku(row)"></el-button>
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
                title="查看SKU列表"
                @click="findSku(row)"></el-button>
              <el-popconfirm
                :title="`你确定删除这个${row.spuName}吗?`"
                width="200px"
                @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    title="删除SPU"></el-button>
                </template>
              </el-popconfirm>
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
      <SkuForm
        ref="sku"
        v-show="scene === 2"
        @changeScene="changeScene"></SkuForm>
      <!-- dialog对话框:展示已有SKU数据 -->
      <el-dialog v-model="showDialog" title="SKU列表">
        <el-table :data="skuArr" border>
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row }">
              <img
                :src="row.skuDefaultImg"
                alt=""
                style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  HasSpuResponseData,
  Records,
  SkuData,
  SkuInfoData,
  SpuData,
} from "@/api/product/spu/type";
import { reqHasSpu, reqSkuList, reqRemoveSpu } from "@/api/product/spu/index";
import useCategoryStore from "@/store/modules/category";
import { onBeforeUnmount, ref, watch } from "vue";
// 引入子组件
import SkuForm from "./components/SkuForm.vue";
import SpuForm from "./components/SpuForm.vue";
import { ElMessage } from "element-plus";

const listLoading = ref<boolean>(false); // 加载状态
let page = ref<number>(1); // 查询数据页码
let limit = ref<number>(3); // 查询每页条数
let total = ref<number>(0); // 表格数据总数
let scene = ref<number>(0); // 0展示已有SPU，1展示添加或者修改SPU的结构 2展示添加SKU的结构
let categoryStore = useCategoryStore();
let records = ref<Records>([]); // 存出已有的SPU属性
let spu = ref<any>(); // 获取子组件SpuForm实例
let sku = ref<any>(); // 获取子组件SkuForm实例
let skuArr = ref<SkuData[]>([]); // 存储全部SKU的数据
let showDialog = ref<boolean>(false); // 控制SKU弹窗显示与否

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
    // 点击添加按钮，调用子组件方法，初始化数据
    spu.value.initAddSpu(categoryStore.c3Id);
  } else {
    // 修改---->调用子组件实例方法，获取完整的已有SPU数据
    spu.value.initHasSpuData(row);
  }
};

// 子组件自定义事件
const changeScene = (num: number, isGetHasSpu?: boolean) => {
  scene.value = num;
  if (!isGetHasSpu) return;
  getHasSpu();
};

// 添加SKU按钮回调
const addSku = (row: SpuData) => {
  scene.value = 2; // 点击切换场景值为2
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row); // 调用子组件的方法，初始化添加Sku的数据
};

// 查看SKU点击回调
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList(row.id as number);
  if (result.code === 200) {
    skuArr.value = result.data;
    showDialog.value = true;
  }
};

// 删除已有SPU
const deleteSpu = async (row: SpuData) => {
  let result: any = await reqRemoveSpu(row.id as number);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getHasSpu();
  } else {
    ElMessage.error("删除失败");
  }
};

// 路由组件销毁前，清空仓库关于分类的数据
onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>

<style lang="scss" scoped></style>
