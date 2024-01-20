<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
//二维码地址
const url = ref("");
//加载
const loading = ref(true);
//设备码
const d_code = ref("");
//授权码
const u_code = ref("");
//度盘标准登录
const login = () => {
  window.location.href = '/baiduApi/oauth/2.0/authorize?response_type=token&' +
      'client_id=DGxFsWGhyoBdmXS7SmnzAYrtRZwGzjKo&' +
      'redirect_uri=oob&' +
      'scope=basic,netdisk';
}
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
      //设备码
      d_code.value = res.data["device_code"];
      u_code.value = res.data["user_code"]
      window.electronAPI.loginPoll(d_code.value);
    })
    .catch((err) => {
      console.error(err);
    });
});
</script>

<template>
  <div class="container">
    <div>授权码：{{ u_code }}</div>
    <div class="error-message">如果授权登录未正常跳转</div>
    <el-button type="primary" plain @click="">可点击尝试普通登录</el-button>
    <el-image
        style="width: 300px; height: 300px"
        :src="url"
        class="image"
        id="image"
    ></el-image>
  </div>
  <div v-loading="loading" element-loading-text="等待登录中......"></div>
</template>

<style scoped lang="css">
.image {
  margin-bottom: 20px; /* 调整底部间距 */
}
.error-message {
  color: red; /* 设置文本颜色为红色 */
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
