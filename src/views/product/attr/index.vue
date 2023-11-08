<template>
  <div>
    <!-- 三级分类组件 -->
    <Category :scene="scene" />

    <el-card class="box-card" style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3Id === ''"
          @click="addOrEditAttr"
          v-has="'btn.Attr.add'">
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
            <template #="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 5px">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="addOrEditAttr(row)"
                v-has="'btn.Attr.update'"></el-button>
              <el-popconfirm
                :title="`请问您是否确认删除(${row.attrName})?`"
                icon="Delete"
                width="260px"
                @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button
                    v-has="'btn.Attr.remove'"
                    type="danger"
                    size="small"
                    icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <!-- 展示添加、修改的dom结构 -->
        <el-form :inline="true" :model="attrParams">
          <el-form-item label="属性名称">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="attrParams.attrName === ''"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button plain size="default" @click="cancel">取消</el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrParams.attrValueList">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row, $index }">
              <!-- row 当前属性值对象 -->
              <el-input
                :ref="(vc: any) => (inputAttr[$index] = vc)"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                size="small"
                v-model="row.valueName"
                placeholder="请输入属性值名称" />
              <div v-else @click="toEdit(row, $index)" style="width: 100%">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="attrParams.attrValueList.length <= 0">
          保存
        </el-button>
        <el-button size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, reactive, ref, watch } from "vue";
import { reqAddOrEditAttr, reqAttr, reqRemoveAttr } from "@/api/product/attr";
import { AttrResponseData, Attr, AttrValue } from "@/api/product/attr/type";
import useCategoryStore from "@/store/modules/category";
import { ElMessage } from "element-plus";

let categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([]);
// 卡片内容切换变量 0 显示table  1 展示添加与修改属性的结构
let scene = ref<number>(0);
// 收集新增属性时所需要的参数数据
let attrParams = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: "", //确定到三级分类的具体某一个
  categoryLevel: 3, // 代表三级分类
});
// 定义数组：将来存储组件实例el-input
let inputAttr = ref<any>([]);

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

// 添加 、 修改 属性按钮回调
const addOrEditAttr = (row: Attr) => {
  if (!row.id) {
    // 新增
    resetForm();
  } else {
    // 将已有的属性对象 赋值给attrParams的数据集合
    // JSON.parse(JSON.stringify(row)) 修复了深浅拷贝带来的问题
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
  }
  // 切换卡片内部dom结构
  scene.value = 1;
};

// 删除某个已有属性方法回调
const deleteAttr = async (attrId: number) => {
  let result: any = await reqRemoveAttr(attrId);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getAttr();
  } else {
    ElMessage.error("删除失败");
  }
};

// 取消按钮的回调
const cancel = () => {
  scene.value = 0;
};

// 添加属性值按钮
const addAttrValue = () => {
  // 点击添加属性值按钮的时候，数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: "",
    flag: true, // 控制每一属性值的编辑或查看模式
  });
  nextTick(() => {
    inputAttr.value[attrParams.attrValueList.length - 1].focus();
  });
};

// 添加或修改属性值时间，保存按钮回调
const save = async () => {
  // 收集参数，发请求
  let result: any = await reqAddOrEditAttr(attrParams);
  if (result.code === 200) {
    scene.value = 0;
    ElMessage.success(attrParams.id ? "修改成功" : "添加成功");
    // 获取全部已有属性与属性值
    getAttr();
  } else {
    ElMessage.success(attrParams.id ? "修改失败" : "添加失败");
  }
};

// 属性值表单元素失去焦点
const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() === "") {
    attrParams.attrValueList.splice($index, 1); // 将重复的属性值从属性数组中删除
    ElMessage.error("属性值不能为空，请输入您要添加的属性值");
    return;
  }
  // 属性值不能重复，校验
  let repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) item.valueName === row.valueName;
  });
  if (repeat) {
    attrParams.attrValueList.splice($index, 1); // 将重复的属性值从属性数组中删除
    ElMessage.error("当前输入的属性值已在属性中存在");
    return;
  }
  row.flag = false;
};

// 点击属性值盒子，切换展示输入框
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true;
  nextTick(() => {
    inputAttr.value[$index].focus();
  });
};

// 表单重置
const resetForm = () => {
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  });
};

// 当路由组件切换，销毁，清空仓库内分类的数据
onBeforeUnmount(() => {
  // 仓库数据统一清空方法（ 分类仓库 ）
  categoryStore.$reset();
});
</script>

<style lang="scss" scoped></style>
