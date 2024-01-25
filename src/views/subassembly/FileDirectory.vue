<script setup>
import { getDirectory } from "@/script/Directory.js";
import { FolderOpened, ArrowLeft } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

//datalist
const dataList = ref([]);
//目标路径
const path = ref("/");
//加载状态
const loading = ref(false);
//页码
const pages = ref(0);
//挂载结束时
onMounted(async () => {
  //首次获取目录，用于初始化页面
  getDirectory(path.value, 0, 10).then((list) => {
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
  getDirectory(path.value, 0, 10).then((list) => {
    dataList.value = list.value;
    //设置加载状态为false
    loading.value = false;
  });
};
// 返回上一级按钮点击事件处理函数
const goBack = () => {
  path.value = processPath(path.value);
  //设置加载状态为true
  loading.value = true;
  // 获取目录
  getDirectory(path.value, 0, 10).then((list) => {
    dataList.value = list.value;
    // 设置加载状态为 false
    loading.value = false;
  });
};
//加载
const load = (event) => {
  pages.value += 1;
  console.log(event.target.scrollTop);
};
//处理返回路径
function processPath(str) {
  if (str === "/" || str === "/xxx") {
    return "/";
  }
  const segments = str.split("/").filter((segment) => segment !== "");
  const result = "/" + segments.slice(0, -1).join("/");
  return result === "" ? "/" : result;
}
</script>

<template>
  <el-table
    ref="multipleTableRef"
    :data="dataList"
    :key="dataList"
    v-loading="loading"
    class="el-table"
    style="width: 100%"
    height="406"
    @scroll.capture="load($event)"
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
          :disabled="row.isdir"
          circle
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="button-container">
    <el-button
      @click="goBack"
      class="go-back"
      type="primary"
      :icon="ArrowLeft"
    ></el-button>
    <div class="button-group">
      <el-button @click="">新增</el-button>
      <el-button @click="">删除</el-button>
    </div>
  </div>
</template>

<style scoped lang="css">
.button-container {
  display: flex;
  justify-content: space-between;
}

.button-group {
  display: flex;
  margin-right: 20px;
}

.go-back {
  margin-left: 20px;
}

.el-table {
  margin-bottom: 20px;
}
</style>
