<template>
  <!-- 三级分类组件 -->
  <Category />

  <el-card class="box-card" style="margin: 10px 0">
    <el-button type="primary" icon="Plus">添加属性</el-button>
    <el-table style="margin: 10px 0">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"></el-table-column>
      <el-table-column
        label="属性名称"
        align="center"
        width="120px"></el-table-column>
      <el-table-column label="属性值名称" align="center"></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="120px"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
