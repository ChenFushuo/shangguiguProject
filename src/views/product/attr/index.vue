<template>
  <div>
    <!-- 三级分类组件 -->
    <Category />

    <el-card class="box-card" style="margin: 10px 0">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="categoryStore.c3Id === ''">
        添加属性
      </el-button>
      <el-table style="margin: 10px 0" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"></el-table-column>
        <el-table-column
          label="属性名称"
          align="center"
          width="120px"
          prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #default="{ row }">
            <el-tag
              v-for="item in row.attrValueList"
              :key="item.id"
              style="margin: 5px">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px">
          <!-- <template #default="{ row }"> -->
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
          <!-- </template> -->
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { reqAttr } from "@/api/product/attr";
import { AttrResponseData, Attr } from "@/api/product/attr/type";
import useCategoryStore from "@/store/modules/category";

let categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([]);

watch(
  () => categoryStore.c3Id, // 监听的值，
  () => {
    // 清空上次查询的属性与属性值
    attrArr.value = [];
    // 若没有三级ID不获取表格内容
    if (!categoryStore.c3Id) return;
    //值发生变化时的回调函数
    getAttr();
  }
);

// 获取属性值接口调用方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore;
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  if (result.code === 200) {
    attrArr.value = result.data;
  }
  console.log(result);
};
</script>

<style lang="scss" scoped></style>
