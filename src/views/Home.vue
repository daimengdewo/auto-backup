<script setup>
import { ref } from "vue";
import DirManager from "@/views/subassembly/DirManager.vue";
import ResourceInfo from "@/views/subassembly/ResourceInfo.vue";
//被选择标签
const activeName = ref("first");
</script>

<template>
  <el-tabs type="border-card" v-model="activeName" class="tabs">
    <el-tab-pane label="资源信息" name="first">
      <!-- 资源信息子组件 -->
      <ResourceInfo></ResourceInfo>
    </el-tab-pane>
    <el-tab-pane label="目录管理" name="second">
      <!-- 目录管理子组件 -->
      <DirManager></DirManager>
    </el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="css" class="button">
@import "@/css/App.css";
</style>
