<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const dataList = ref([]);
//被选择标签
const activeName = ref("")

onMounted(async () => {
  try {
    //获取token
    let token = await window.electronAPI.getToken("baidu");
    //获取用户数据
    const userRes = await axios.get(
        "/panApi/rest/2.0/xpan/nas?" +
        "method=uinfo&" +
        "access_token=" + token
    );
    //判断token是否在线
    if (userRes.data["baidu_name"]){
      const panRes = await axios.get(
          "/panApi/api/quota?" +
          "access_token=" + token +
          "checkfree=1&" +
          "checkexpire=1"
      )
      //数据组装
      const data = {
        username: userRes.data["baidu_name"],
        vip_type: "",
        total: panRes.data["total"],
        used: panRes.data["used"]
      };
      switch (userRes.data["vip_type"]) {
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
      //填充进去
      dataList.value.push(data)
    }else {
      window.electronAPI.setTokenType("baidu",false)
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <el-tabs type="border-card" v-model="activeName" class="tabs">
    <el-tab-pane label="资源信息" name="first">
      <el-table :data="dataList" style="width: 100%" height="250">
        <el-table-column fixed prop="username" label="用户名" width="150"/>
        <el-table-column prop="vip_type" label="会员等级" width="120"/>
        <el-table-column prop="total" label="总空间" width="120"/>
        <el-table-column prop="used" label="已使用空间" width="120"/>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="css" class="button">
@import "@/css/app.css";
</style>
