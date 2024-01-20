<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
//二维码地址
const url = ref("");
//加载
const loading = ref(true);
//设备码
const code = ref("");
//钩子
onMounted(() => {
  //获取机器码和二维码地址
  axios
    .get(
      "/baiduApi/oauth/2.0/device/code?" +
        "response_type=device_code&" +
        "client_id=DGxFsWGhyoBdmXS7SmnzAYrtRZwGzjKo&" +
        "scope=basic,netdisk",
    )
    .then((res) => {
      url.value = res.data["qrcode_url"].replace(
        /https:\/\/openapi.baidu.com/g,
        "/baiduApi",
      );
      code.value = res.data["device_code"];
      window.electronAPI.loginPoll(code.value);
    })
    .catch((err) => {
      console.error(err);
    });
});
</script>

<template>
  <div>授权码：{{ code }}</div>
  <el-image
    style="width: 300px; height: 300px"
    :src="url"
    class="image"
    id="image"
  ></el-image>
  <div v-loading="loading" element-loading-text="等待登录中......"></div>
</template>

<style scoped lang="css">
.image {
  margin-bottom: 20px; /* 调整底部间距 */
}
</style>
