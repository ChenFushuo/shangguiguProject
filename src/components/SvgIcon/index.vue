<template>
  <div>
    <svg :style="{ width, height }">
      <use :fill="color" :xlink:href="prefix + name"></use>
    </svg>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  prefix: {
    // xlink:href属性值前缀
    type: String,
    default: "#icon-",
  },
  name: String,
  color: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
});
</script>

<style scoped></style>
