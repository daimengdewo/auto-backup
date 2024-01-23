<script setup>
import { ref, onMounted } from "vue";
import { getResources } from "@/script/resources.js";

const dataList = ref([]);
//被选择标签
const activeName = ref("");

// 获取资源颜色
const getColor = (isLive) => {
  return isLive === true ? "green" : "red";
};
onMounted(async () => {
  getResources().then((list) => {
    dataList.value = list.value;
  });
});
</script>

<template>
  <el-tabs type="border-card" v-model="activeName" class="tabs">
    <el-tab-pane label="资源信息" name="first">
      <el-table :data="dataList" style="width: 100%" height="410">
        <el-table-column
          fixed
          prop="type"
          label="资源类型"
          align="center"
          width="110"
        />
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
          width="110"
        />
        <el-table-column
          prop="total"
          label="总空间"
          align="center"
          width="110"
        />
        <el-table-column
          prop="used"
          label="已使用空间"
          align="center"
          width="110"
        />
        <el-table-column
          prop="isLive"
          label="是否登录"
          align="center"
          width="110"
        >
          <template #default="{ row }">
            <span :style="{ color: getColor(row.isLiveType) }">{{
              row.isLiveType
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="可用操作" align="center" width="135">
          <div style="display: flex; justify-content: center">
            <el-button type="success" @click="" :disabled="true"
              >登录</el-button
            >
            <el-button type="primary" @click="" style="margin-left: 10px"
              >目标</el-button
            >
          </div>
        </el-table-column>
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
