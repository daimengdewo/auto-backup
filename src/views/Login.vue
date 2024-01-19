<script setup>
import axios from 'axios';
import {ref, onMounted} from "vue";
//二维码地址
const url = ref("")
//钩子
onMounted(() => {
  axios.get('/baiduApi/oauth/2.0/device/code?' +
      'response_type=device_code&' +
      'client_id=DGxFsWGhyoBdmXS7SmnzAYrtRZwGzjKo&' +
      'scope=basic,netdisk')
      .then(res => {
        url.value = res.data.qrcode_url.replace(/https:\/\/openapi.baidu.com/g, "/baiduApi");
      })
      .catch(err => {
        console.error(err);
      });
})
</script>

<template>
  <el-image style="width: 300px; height: 300px" :src="url" />
</template>

<style scoped lang="css">
</style>
