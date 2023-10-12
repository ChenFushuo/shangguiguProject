<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input v-model="skuParams.skuName" placeholder="请输入SKU名称" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        v-model="skuParams.price"
        placeholder="请输入价格(元)"
        type="number" />
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        v-model="skuParams.weight"
        placeholder="请输入重量(克)"
        type="number" />
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        v-model="skuParams.skuDesc"
        placeholder="请输入SKU描述"
        type="textarea" />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true" label-width="100px">
        <el-form-item
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName">
          <el-select
            v-model="item.attrIdAndValueId"
            :placeholder="`请选择${item.attrName}`">
            <el-option
              v-for="attrValue in item.attrValueList"
              :key="attrValue.id"
              :label="attrValue.valueName"
              :value="`${item.id}:${attrValue.id}`" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          v-for="item in saleArr"
          :key="item.id"
          :label="item.saleAttrName">
          <el-select
            v-model="item.saleIdAndValueId"
            :placeholder="`请选择${item.saleAttrName}`">
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="`${item.id}:${saleAttrValue.id}`"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table ref="table" border :data="imageArr">
        <el-table-column
          type="selection"
          align="center"
          width="80"></el-table-column>
        <el-table-column labe="图片">
          <template #="{ row }">
            <img :src="row.imgUrl" alt="" style="width: 100px" />
          </template>
        </el-table-column>
        <el-table-column labe="名称" prop="imgName"></el-table-column>
        <el-table-column labe="操作">
          <template #="{ row }">
            <el-button size="small" type="primary" @click="handle(row)">
              设置默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button size="default" @click="cancel"> 取消 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reqAttr } from "@/api/product/attr";
import {
  reqAddSku,
  reqSpuHasSaleAttr,
  reqSpuImageList,
} from "@/api/product/spu";
import { SpuData, SkuData } from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";

let $emit = defineEmits(["changeScene"]); // 自定义事件
let attrArr = ref<any>([]); // 平台属性
let saleArr = ref<any>([]); // 销售属性
let imageArr = ref<any>([]); // 照片墙数据
let skuParams = reactive<SkuData>({
  category3Id: "", // 三级分类Id
  spuId: "", // spu的id
  tmId: "", // SPU品牌的Id
  skuName: "", // SKU的名字
  price: "", // SKU价格
  weight: "", // SKU重量
  skuDesc: "", // SKU描述
  // 平台属性收集数组
  skuAttrValueList: [],
  // 销售属性收集数组
  skuSaleAttrValueList: [],
  skuDefaultImg: "", // SKU默认图片地址
});
let table = ref<any>(); // table组件实例

// 获取添加SKU需要的数据
const initSkuData = async (
  c1Id: string | number,
  c2Id: string | number,
  spu: SpuData
) => {
  // 收集数据
  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = spu.id as string | number;
  skuParams.tmId = spu.tmId;

  let result: any = await reqAttr(c1Id, c2Id, spu.category3Id); // 获取平台属性
  attrArr.value = result.data; // 存储平台属性

  let result1: any = await reqSpuHasSaleAttr(spu.id as number); // 获取对应的销售属性值
  saleArr.value = result1.data; // 存储销售属性

  let result2: any = await reqSpuImageList(spu.id as number); // 获取照片墙属性
  imageArr.value = result2.data; // 存储照片墙数据
};

// 设置默认图片回调
const handle = (row: any) => {
  // 点击的时候先把所有复选框设置不勾选
  imageArr.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false);
  });
  // 选中table实例的某一行,设置勾选状态
  table.value.toggleRowSelection(row, true);

  skuParams.skuDefaultImg = row.imgUrl;
};

// 保存按钮方法
const save = async () => {
  // 整理平台属性
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(":");
      prev.push({ attrId, valueId });
    }
    return prev;
  }, []);
  // 整理销售属性
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(":");
        prev.push({ saleAttrId, saleAttrValueId });
      }
      return prev;
    },
    []
  );
  // 发送请求
  let result: any = await reqAddSku(skuParams);
  if (result.code === 200) {
    ElMessage.success(`添加SKU成功`);
    $emit("changeScene", 0, false); // 切换场景
  } else {
    ElMessage.error(`添加SKU失败`);
  }
};

// 取消按钮
const cancel = () => {
  $emit("changeScene", 0, false);
};

defineExpose({ initSkuData });
</script>

<style scoped></style>
