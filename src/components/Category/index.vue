<template>
  <el-card class="box-card">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene !== 0"
          v-model="categoryStore.c1Id"
          @change="handler">
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene !== 0"
          v-model="categoryStore.c2Id"
          @change="handler1">
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="scene !== 0" v-model="categoryStore.c3Id">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useCategoryStore from "@/store/modules/category";
let categoryStore = useCategoryStore();

defineProps(["scene"]);
onMounted(() => {
  getC1();
});

// 通知仓库获取一级分类
const getC1 = () => {
  categoryStore.getC1();
};
// 一级分类选中值之后出发，保证具备一级ID，可调用获取二级分类接口
const handler = () => {
  // 一级分类发生变化需要清除选中的二级Id，以及全部三级的数据
  categoryStore.c2Id = "";
  categoryStore.c3Arr = [];
  categoryStore.c3Id = "";
  // 获取二级分类数据
  categoryStore.getC2();
};
// 二级分类选中值之后出发，保证具备二级ID，可调用获取三级分类接口
const handler1 = () => {
  // 二级分类数据被更改，清空已选择的三级id
  categoryStore.c3Id = "";
  // 获取三级分类数据
  categoryStore.getC3();
};
</script>

<style lang="scss" scoped></style>
