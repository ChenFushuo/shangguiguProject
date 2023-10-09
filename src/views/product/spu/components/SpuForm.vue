<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称" prop="spuName">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option label="huawei"></el-option>
        <el-option label="oppo"></el-option>
        <el-option label="vivo"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <!-- <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog> -->
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select>
        <el-option label="huawei"></el-option>
        <el-option label="oppo"></el-option>
        <el-option label="vivo"></el-option>
      </el-select>
      <el-button
        type="primary"
        size="dafault"
        icon="Plus"
        style="margin-left: 10px">
        添加销售属性
      </el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"></el-table-column>
        <el-table-column label="销售属性名字" width="120px"></el-table-column>
        <el-table-column label="销售属性值" width="120px"></el-table-column>
        <el-table-column lanel="操作"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="primary" plain size="default" @click="cancel">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from "@/api/product/spu";
import {
  AllTradeMark,
  HasSaleAttr,
  HasSaleAttrResponseData,
  SaleAttr,
  SaleAttrResponseData,
  SpuData,
  SpuHasImg,
  SpuImg,
} from "@/api/product/spu/type";
import { Trademark } from "@/api/product/trademark/type";
import { ref } from "vue";

let $emit = defineEmits(["changeScene"]);
// 子组件点击取消按钮通知父组件，切换场景值为1
const cancel = () => {
  $emit("changeScene", 0);
};

let allTradeMarkData = ref<Trademark[]>([]); // 存储已有SPU数据
let imageList = ref<SpuImg[]>([]); // 商品图片
let saleAttr = ref<SaleAttr[]>([]); // SPU已有销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]); // 项目所有销售属性
// 初始化第一个方法，获取spu数据
const initHasSpuData = async (spu: SpuData) => {
  // SPU即为父组件传递的SPU对象['不完整的SPU信息']
  let result: AllTradeMark = await reqAllTradeMark(); // 获取全部品牌数据
  allTradeMarkData.value = result.data; // 存储全部品牌数据

  let result1: SpuHasImg = await reqSpuImageList(spu.id as number); // 获取某一个品牌旗下售卖商品的图片
  imageList.value = result1.data; // SPU对应商品的图片

  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number); // 获取已有SPU的销售属性
  saleAttr.value = result2.data; // SPU已有销售属性

  let result3: HasSaleAttrResponseData = await reqAllSaleAttr(); // 获取整个项目全部的SPU销售属性
  allSaleAttr.value = result3.data; // 项目所有销售属性
};
// 对外暴露方法
defineExpose({ initHasSpuData });
</script>

<style scoped></style>
