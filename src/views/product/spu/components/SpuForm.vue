<template>
  <el-form label-width="100px" :model="spuParams">
    <el-form-item label="SPU名称" prop="spuName">
      <el-input
        v-model="spuParams.spuName"
        clearable
        placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌" prop="tmId">
      <el-select
        v-model="spuParams.tmId"
        clearable
        filterable
        placeholder="请选择SPU品牌">
        <el-option
          v-for="item in allTradeMarkData"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述" prop="description">
      <el-input
        type="textarea"
        clearable
        v-model="spuParams.description"
        placeholder="请输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片" prop="imageList">
      <!-- file-list 用于展示默认图片 -->
      <!-- action 上传文件接口地址 -->
      <el-upload
        v-model:file-list="imageList"
        :action="fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handleUpload">
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="saleAttrAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个SPU属性`
            : '无'
        ">
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"></el-option>
      </el-select>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="saleAttrAndValueName === ''"
        @click="addSaleAttr"
        style="margin-left: 10px">
        添加属性
      </el-button>
      <el-table :data="saleAttr" border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="120px"
          prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row }">
            <el-tag
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="row.id"
              style="margin: 0 5px"
              class="mx-1"
              closable
              @close="row.spuSaleAttrValueList.splice(index, 1)">
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag"
              v-model="row.saleAttrValue"
              placeholder="请输入属性值"
              size="small"
              @blur="toEditOrLook(row)"
              style="width: 100px"></el-input>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="Plus"
              @click="toEditOrLook(row)"
              style="margin-left: 5px"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #default="{ $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="default"
        :disabled="saleAttr.length <= 0"
        @click="save">
        保存
      </el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from "@/api/product/spu";
import { fileUpload } from "@/api";
import {
  AllTradeMark,
  HasSaleAttr,
  HasSaleAttrResponseData,
  SaleAttr,
  SaleAttrValue,
  SaleAttrResponseData,
  SpuData,
  SpuHasImg,
  SpuImg,
} from "@/api/product/spu/type";
import { Trademark } from "@/api/product/trademark/type";
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";

let $emit = defineEmits(["changeScene"]);
// 子组件点击取消按钮通知父组件，切换场景值为1
const cancel = () => {
  $emit("changeScene", 0, false);
};

let allTradeMarkData = ref<Trademark[]>([]); // 存储已有SPU数据
let imageList = ref<SpuImg[]>([]); // 商品图片
let saleAttr = ref<SaleAttr[]>([]); // SPU已有销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]); // 项目所有销售属性
let spuParams = ref<SpuData>({
  category3Id: "", //收集三级分类的ID
  spuName: "", //SPU的名字
  description: "", //SPU的描述
  tmId: "", //品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
});
let dialogVisible = ref<boolean>(false); // 图片蒙版显示(控制对话框显示隐藏)
let dialogImageUrl = ref<string>(""); // 图片路径
let saleAttrAndValueName = ref<string>(""); // 收集还未选择的SPU销售属性的id与属性名

// 修改SPU时，初始化方法，获取spu数据
const initHasSpuData = async (spu: SpuData) => {
  // 存储已有的spu对象，将来在模板中展示
  spuParams.value = spu;
  // SPU即为父组件传递的SPU对象['不完整的SPU信息']
  let result: AllTradeMark = await reqAllTradeMark(); // 获取全部品牌数据
  allTradeMarkData.value = result.data; // 存储全部品牌数据

  let result1: SpuHasImg = await reqSpuImageList(spu.id as number); // 获取某一个品牌旗下售卖商品的图片
  imageList.value = result1.data.map((item) => {
    return { name: item.imgName, url: item.imgUrl };
  }); // SPU对应商品的图片

  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number); // 获取已有SPU的销售属性
  saleAttr.value = result2.data; // SPU已有销售属性

  let result3: HasSaleAttrResponseData = await reqAllSaleAttr(); // 获取整个项目全部的SPU销售属性
  allSaleAttr.value = result3.data; // 项目所有销售属性
};

// 点击照片墙已经上传的图片--->预览按钮
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

// 图片上传函数
const handleRemove = () => {};

//照片墙上传成功之前的钩子约束文件的大小与类型
const handleUpload = (file: any) => {
  if (
    file.type == "image/png" ||
    file.type == "image/jpeg" ||
    file.type == "image/gif"
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传文件务必小于3M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传文件务必PNG|JPG|GIF",
    });
    return false;
  }
};

// 计算当前SPU未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  let unSelectAttr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name !== item1.saleAttrName;
    });
  });
  return unSelectAttr;
});

// 添加销售属性的方法
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrAndValueName.value.split(":");
  // 准备一个新的属性对象带给服务器
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  };
  saleAttr.value.push(newSaleAttr);
  // 清空销售属性下拉筛选
  saleAttrAndValueName.value = "";
};

// 属性值添加按钮
const toEditOrLook = (row: SaleAttr) => {
  if (row.flag) {
    // 收集属性ID与属性值名字
    const { baseSaleAttrId, saleAttrValue } = row;
    // 处理为服务器需要的数据
    let newSaleAttrValue: SaleAttrValue = {
      baseSaleAttrId,
      saleAttrValueName: saleAttrValue as string,
    };

    // 非法情况判断
    if ((saleAttrValue as string).trim() === "") {
      ElMessage.error("属性值不能为空");
      row.saleAttrValue = "";
      row.flag = !row.flag;
      return;
    }
    //判断属性值是否在数组当中存在
    let repeat = row.spuSaleAttrValueList.find((item) => {
      return item.saleAttrValueName == saleAttrValue;
    });
    if (repeat) {
      ElMessage.error("属性值已经存在");
      row.saleAttrValue = "";
      row.flag = !row.flag;
      return;
    }
    // 追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue);
  } else {
    row.saleAttrValue = "";
  }
  row.flag = !row.flag;
};

// 保存按钮
const save = async () => {
  // 整理参数，调用接口提交SPU信息
  // 1. 照片墙的数据处理
  spuParams.value.spuImageList = imageList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    };
  });
  // 2. 销售属性的数据的处理
  spuParams.value.spuSaleAttrList = saleAttr.value;
  // 3. 发送请求
  let result = await reqAddOrUpdateSpu(spuParams.value);
  if (result.code === 200) {
    ElMessage.success(spuParams.value.id ? "更新成功" : "新增成功");
    $emit("changeScene", 0, true); // 通知父组件切换场景为0
  } else {
    ElMessage.success(spuParams.value.id ? "更新失败" : "新增失败");
  }
};

// 添加一个新的SPU时，初始化方法
const initAddSpu = async (c3Id: string | number) => {
  clearFormData();
  // 新增时，只需要获取品牌数据和销售属性数据就好
  spuParams.value.category3Id = c3Id;
  let result: AllTradeMark = await reqAllTradeMark(); // 获取全部品牌数据
  allTradeMarkData.value = result.data; // 存储全部品牌数据

  let result1: HasSaleAttrResponseData = await reqAllSaleAttr(); // 获取整个项目全部的SPU销售属性
  allSaleAttr.value = result1.data; // 项目所有销售属性
};

// 清空新增、修改操作的表单收集数据
const clearFormData = () => {
  Object.assign(spuParams.value, {
    id: "",
    category3Id: "", //收集三级分类的ID
    spuName: "", //SPU的名字
    description: "", //SPU的描述
    tmId: "", //品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
  });
  imageList.value = []; // 清空所有已上传的照片
  saleAttr.value = []; // 清空所有销售属性
  saleAttrAndValueName.value = ""; // 清空销售属性下拉框绑定值
};

// 对外暴露方法
defineExpose({ initHasSpuData, initAddSpu });
</script>

<style scoped></style>
