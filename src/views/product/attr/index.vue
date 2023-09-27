<template>
  <div>
    <!-- 三级分类组件 -->
    <Category :scene="scene" />

    <el-card class="box-card" style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button type="primary" icon="Plus" :disabled="categoryStore.c3Id === ''" @click="addOrEditAttr">
          添加属性
        </el-button>
        <el-table style="margin: 10px 0" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" align="center" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 5px">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template #default="{ row }">
              <el-button type="primary" size="small" icon="Edit" @click="addOrEditAttr(row)"></el-button>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <!-- 展示添加、修改的dom结构 -->
        <el-form :inline="true" :model="attrParams">
          <el-form-item label="属性名称">
            <el-input v-model="attrParams.attrName" placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" icon="Plus" :disabled="attrParams.attrName === ''"
          @click="addAttrValue">添加属性值</el-button>
        <el-button plain size="default" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <!-- row 当前属性值对象 -->
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" />
            </template>
          </el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button plain size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { reqAddOrEditAttr, reqAttr } from "@/api/product/attr";
import { AttrResponseData, Attr } from "@/api/product/attr/type";
import useCategoryStore from "@/store/modules/category";
import { ElMessage, resultProps } from "element-plus";

let categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([]);
// 卡片内容切换变量 0 显示table  1 展示添加与修改属性的结构
let scene = ref<number>(0)
// 收集新增属性时所需要的参数数据
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '', //确定到三级分类的具体某一个
  categoryLevel: 3 // 代表三级分类
})

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
};

// 添加属性按钮回调
const addOrEditAttr = (row: Attr) => {
  // 切换卡片内部dom结构
  scene.value = 1
  if (!row.id) {
    // 新增的时候，收集三级分类的Id
    attrParams.categoryId = categoryStore.c3Id
  } else {
    console.log('编辑');
  }
}

// 取消按钮的回调
const cancel = () => {
  scene.value = 0
}

// 添加属性值按钮
const addAttrValue = () => {
  // 点击添加属性值按钮的时候，数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: ''
  })
}

// 添加或修改属性值时间，保存按钮回调
const save = () => {
  // 收集参数，发请求
  let result: any = reqAddOrEditAttr(attrParams)
  if (result.code === 200) {
    scene.value = 0
    ElMessage.success(attrParams.id ? "修改成功" : "添加成功")
    // 获取全部已有属性与属性值
    getAttr()
  } else {
    ElMessage.success(attrParams.id ? "修改失败" : "添加失败")
  }

}
</script>

<style lang="scss" scoped></style>
