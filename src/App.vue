<script setup>
import {ref} from "vue";
import {ipcRenderer} from "electron";
//input
const inputValue = ref('')
const send = () => {
  ipcRenderer.send('msg',1);
}
</script>

<template>
  <main>
    <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
    <el-button type="primary" @click="send()">发送测试</el-button>
  </main>
</template>

<style scoped lang="css">

</style>