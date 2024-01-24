<script setup>
import { ref, onMounted } from "vue";
import { getResources } from "@/script/Resources.js";

const dataList = ref([]);
//isLiveType
const isLiveType = ref(false);

// 获取资源颜色
const getColor = (isLive) => {
  //当前isLiveType
  isLiveType.value = isLive;
  //返回颜色
  return isLive === true ? "green" : "red";
};
onMounted(async () => {
  getResources().then((list) => {
    dataList.value = list.value;
  });
});
</script>

<template>
  <el-table :data="dataList" style="width: 100%" height="464">
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
    <el-table-column prop="total" label="总空间" align="center" width="110" />
    <el-table-column
      prop="used"
      label="已使用空间"
      align="center"
      width="110"
    />
    <el-table-column
      prop="isLiveText"
      label="是否登录"
      align="center"
      width="110"
    >
      <template #default="{ row }">
        <span :style="{ color: getColor(row.isLiveType) }">{{
          row.isLiveText
        }}</span>
      </template>
    </el-table-column>
    <el-table-column label="可用操作" align="center" show-overflow-tooltip>
      <div style="display: flex; justify-content: center">
        <el-button type="success" @click="" :disabled="isLiveType"
          >登录</el-button
        >
        <el-button type="primary" @click="" style="margin-left: 10px"
          >自定义配置</el-button
        >
      </div>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="css"></style>
