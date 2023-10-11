<template>
  <el-pagination
    :current-page="props.page"
    :page-size="props.limit"
    :page-sizes="props.pageSizes"
    background
    layout="prev, pager, next, jumper, ->, sizes, total"
    :total="props.total"
    @update:page-size="handleSizeChange"
    @update:current-page="handleCurrentChange" />
</template>

<script setup lang="ts">
import { PropType } from "vue";

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
  pageSizes: {
    type: Array,
    default: [3, 5, 7, 9, 11],
  },
  // 数据总条数
  total: {
    type: Number,
    default: 1,
  },
  // 页码/每页条数变更触发的方法
  updateData: {
    type: Function as PropType<() => void>,
    default: () => {},
  },
});

interface EmitsType {
  (e: "update:page", page: number): void;
  (e: "update:limit", size: number): void;
}

const emit = defineEmits<EmitsType>();

const handleCurrentChange = (page: number) => {
  emit("update:page", page);
  props.updateData();
};

const handleSizeChange = (size: number) => {
  emit("update:page", 1);
  emit("update:limit", size);
  props.updateData && props.updateData();
};
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
