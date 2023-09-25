<template>
  <el-card class="box-card">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id">
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select>
          <el-option label="北京" value=""></el-option>
          <el-option label="上海" value=""></el-option>
          <el-option label="广州" value=""></el-option>
          <el-option label="深圳" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select>
          <el-option label="北京" value=""></el-option>
          <el-option label="上海" value=""></el-option>
          <el-option label="广州" value=""></el-option>
          <el-option label="深圳" value=""></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useCategoryStore from "@/store/modules/category";
let categoryStore = useCategoryStore();

onMounted(() => {
  getC1();
});

// 通知仓库获取一级分类
const getC1 = () => {
  categoryStore.getC1();
};
</script>

<style lang="scss" scoped></style>
