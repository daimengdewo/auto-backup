<script setup>
import { getDirectory } from "@/script/Directory.js";
import { FolderOpened } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

//datalist
const dataList = ref([]);
//目标路径
const path = ref("/");
//加载状态
const loading = ref(false);
//挂载结束时
onMounted(async () => {
  //首次获取目录，用于初始化页面
  getDirectory(path.value).then((list) => {
    dataList.value = list.value;
  });
});
// 点击事件处理函数
const folderOpenClick = async (row) => {
  //相同不执行
  if (path.value === row.path) {
    return;
  }
  //设置加载状态为true
  loading.value = true;
  //重新设置当前目录
  path.value = row.path;
  //获取目录
  getDirectory(path.value).then((list) => {
    dataList.value = list.value;
    //设置加载状态为false
    loading.value = false;
  });
};
</script>

<template>
  <el-table
    ref="multipleTableRef"
    :data="dataList"
    :key="dataList"
    v-loading="loading"
    style="width: 100%; height: 406px"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column
      property="filename"
      label="文件名称"
      width="130"
      align="center"
    />
    <el-table-column
      property="local_ctime"
      label="创建时间"
      width="110"
      align="center"
    />
    <el-table-column
      property="local_mtime"
      label="修改时间"
      width="110"
      align="center"
    />
    <el-table-column
      property="size"
      label="文件大小"
      align="center"
      width="100"
    />
    <el-table-column label="打开目录" align="center" show-overflow-tooltip>
      <template #default="{ row }">
        <el-button
          @click="folderOpenClick(row)"
          type="primary"
          :icon="FolderOpened"
          circle
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="">新增</el-button>
    <el-button @click="">删除</el-button>
  </div>
</template>

<style scoped lang="css"></style>
