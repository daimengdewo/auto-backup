<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const dataList = ref([]);
let data = {
  username: "",
  vip_type: "",
  total: "",
  used: ""
};

//发起异步方法
onMounted(async () => {
  try {
    //获取token
    let token = await window.electronAPI.getToken("baidu");
    //获取用户数据
    axios.get(
        "/panApi/rest/2.0/xpan/nas?" +
        "method=uinfo&" +
        "access_token=" + token
    ).then((res) => {
      //数据组装
      data.username = res.data["baidu_name"];
      switch (res.data["vip_type"]) {
        case 0:
          data.vip_type = "普通用户";
          break;
        case 1:
          data.vip_type = "普通会员";
          break;
        case 2:
          data.vip_type = "超级会员";
          break;
        default:
          data.vip_type = "未知会员";
      }
    })
  } catch (error) {
    console.error(error);
  }
//填充进去
  dataList.value.push(data)
});
console.log(dataList.value)
</script>

<template>
  <el-table :data="dataList" style="width: 100%" height="250">
    <el-table-column fixed prop="username" label="用户名" width="150"/>
    <el-table-column prop="vip_type" label="会员等级" width="120"/>
  </el-table>
</template>

<style scoped lang="css" class="button">
@import "@/css/app.css";
</style>
