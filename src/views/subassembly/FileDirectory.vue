<script setup></script>

<template>
  <el-table
    ref="multipleTableRef"
    :data="null"
    style="width: 100%; height: 406px"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="" label="文件名称" width="120">
    </el-table-column>
    <el-table-column property="" label="创建时间" width="120" />
    <el-table-column property="" label="修改时间" width="120" />
    <el-table-column property="" label="文件大小" show-overflow-tooltip />
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="">新增</el-button>
    <el-button @click="">删除</el-button>
  </div>
</template>

<style scoped lang="css"></style>
