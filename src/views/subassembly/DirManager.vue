<script setup>
import { ref } from "vue";
import FileDirectory from "@/views/subassembly/FileDirectory.vue";

const tabPosition = ref("left");
</script>

<template>
  <el-tabs
    :tab-position="tabPosition"
    style="height: 464px; width: 100%"
    class="demo-tabs"
  >
    <el-tab-pane label="百度网盘">
      <FileDirectory></FileDirectory>
    </el-tab-pane>
    <el-tab-pane label="阿里云盘">阿里云盘</el-tab-pane>
    <el-tab-pane label="腾讯微云">腾讯微云</el-tab-pane>
    <el-tab-pane label="迅雷云盘">迅雷云盘</el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="css"></style>
