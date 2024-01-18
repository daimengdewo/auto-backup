<script setup>
import {ref} from "vue"
import("./renderer.js")
//input
const inputValue = ref('')

</script>

<template>
  <main>
    <el-input v-model="inputValue" placeholder="请输入内容" id="openFile"></el-input>
    <el-button type="primary" id="btn">发送测试</el-button>
  </main>
</template>

<style scoped lang="css">

</style>