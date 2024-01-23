<script setup>
import { ref, onMounted } from "vue";
import { getResources } from "@/script/resources.js";

const dataList = ref([]);
//被选择标签
const activeName = ref("first");
//isLiveType
const isLiveType = ref(false)

// 获取资源颜色
const getColor = (isLive) => {
  //当前isLiveType
  isLiveType.value = isLive
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
        <el-table-column label="可用操作" align="center" width="135">
          <div style="display: flex; justify-content: center">
            <el-button type="success" @click="" :disabled="isLiveType"
              >登录</el-button
            >
            <el-button type="primary" @click="" style="margin-left: 10px"
              >配置</el-button
            >
          </div>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <!-- 目录管理 -->
    <el-tab-pane label="目录管理" name="second">
      <el-table
          ref="multipleTableRef"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="Date" width="120">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name" label="Name" width="120" />
        <el-table-column property="address" label="Address" show-overflow-tooltip />
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >Toggle selection status of second and third rows</el-button
        >
        <el-button @click="toggleSelection()">Clear selection</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="css" class="button">
@import "@/css/app.css";
</style>
