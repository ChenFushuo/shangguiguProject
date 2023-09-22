<!-- src\components\Pagination\index.vue -->
<template>
  <el-pagination
    :current-page="props.page"
    :page-size="props.limit"
    :page-sizes="[5, 10, 20, 30, 40]"
    background
    layout="prev, pager, next, jumper, sizes, total"
    :total="props.listCount"
    @update:page-size="handleSizeChange"
    @update:current-page="handleCurrentChange" />
</template>

<script setup lang="ts">
import { PropType } from "vue";

/* 使用 TypeScript 纯类型语法声明 props 和默认值 */
/*
// 使用 TS 方式声明 props
interface PropsType {
  page: number
  limit: number
  listCount: number
  getList: () => void
}

// 定义 props 默认值
const props = withDefaults(defineProps<PropsType>(), {
  page: 1,
  limit: 10,
  listCount: 0,
  getList: () => {}
})
*/

/* 使用运行时声明 */
/* 这种方式声明 props 也支持类型声明，并且在使用默认值的情况下使用这种方式还直观些 */
const props = defineProps({
  // 页码
  page: {
    type: Number,
    default: 1,
  },
  // 每页条数
  limit: {
    type: Number,
    default: 1,
  },
  // 数据总条数
  listCount: {
    type: Number,
    default: 1,
  },
  // 页码/每页条数变更触发的方法
  getList: {
    type: Function as PropType<() => void>,
    default: () => {},
  },
});

/* 使用 TypeScript 纯类型语法声明 emits */
interface EmitsType {
  (e: "update:page", page: number): void;
  (e: "update:limit", size: number): void;
}

const emit = defineEmits<EmitsType>();

/* 使用运行时声明 */
/*
const emit = defineEmits(['update:page', 'update:limit'])
*/

// elementPlus 将在未来删除 size-change current-change 事件
// 建议改为监听 update 事件
const handleCurrentChange = (page: number) => {
  emit("update:page", page);
  props.getList();
};

const handleSizeChange = (size: number) => {
  emit("update:page", 1);
  emit("update:limit", size);
  props.getList && props.getList();
};
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
