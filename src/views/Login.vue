<script setup>
import { ref } from "vue";
import("@/script/renderer.js");
//input
const inputValue = ref("");
</script>

<template>
  <main>
    <el-input
      v-model="inputValue"
      placeholder="请输入内容"
      id="openFile"
      class="input"
    ></el-input>
    <el-button type="primary" id="btn">发送测试</el-button>
  </main>
</template>

<style scoped lang="css" class="button">
@import "@/css/app.css";
</style>
