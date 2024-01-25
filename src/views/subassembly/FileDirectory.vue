<script setup>
import { getDirectory } from "@/script/Directory.js";
import { FolderOpened, ArrowLeft } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { createDirectory, controlDirectory } from "@/script/DIrOperation.js";
import { counterStore } from "@/store/counterStore.js";
import { ElMessage, ElMessageBox } from "element-plus";

//datalist
const dataList = ref([]);
//目标路径
const path = ref("/");
//加载状态
const loading = ref(false);
//临时页码
const start = ref(0);
//行数
const limit = ref(20);
//是否还有下一页
const hasMore = ref(false);
//被选中行路径
const paths = ref([])
//挂载结束时
onMounted(async () => {
  //读取配置
  await counterStore().loadData();
  //首次获取目录，用于初始化页面
  getDirectory(path.value, 0, limit.value, true).then((info) => {
    dataList.value = info["list"].value;
    hasMore.value = info["has_more"];
    start.value = info["cursor"];
  });
});
// 打开目录
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
  getDirectory(path.value, 0, limit.value, true).then((info) => {
    dataList.value = info["list"].value;
    hasMore.value = info["has_more"];
    start.value = info["cursor"];
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
  getDirectory(path.value, 0, limit.value, true).then((info) => {
    dataList.value = info["list"].value;
    hasMore.value = info["has_more"];
    start.value = info["cursor"];
    // 设置加载状态为 false
    loading.value = false;
  });
};
//加载
const load = (event) => {
  if (
    event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight &&
    hasMore.value === true
  ) {
    //设置加载状态为true
    loading.value = true;
    // 获取目录
    getDirectory(path.value, start.value, limit.value, false).then((info) => {
      dataList.value = info["list"].value;
      hasMore.value = info["has_more"];
      start.value = info["cursor"];
      // 设置加载状态为 false
      loading.value = false;
    });
  }
};
//创建目录
const folderCreateClick = async (newFolderName) => {
  //设置加载状态为true
  loading.value = true;
  //获取目录
  createDirectory("baidu", path.value, newFolderName).then((res) => {
    if (res.data["errno"] === 0) {
      ElMessage({
        type: "success",
        message: "目录创建成功",
      });
    } else {
      ElMessage({
        type: "error",
        message: "目录创建失败",
      });
    }
    //设置加载状态为false
    loading.value = false;
  });
};
//弹窗输入name
const open = () => {
  ElMessageBox.prompt("请输入你要使用的目录名称", "提示", {
    confirmButtonText: "创建",
    cancelButtonText: "取消",
    inputPattern: /^[^"*<>?\\|/:]+$/,
    inputErrorMessage: "输入不正确",
  })
    .then(({ value }) => {
      //创建新目录
      folderCreateClick(value);
    })
    .catch(() => {
      ElMessage({
        type: "error",
        message: "目录名称异常或操作已被取消",
      });
    });
};
//弹窗确认删除
const del = () => {
  ElMessageBox.confirm("确认删除被选中目录吗？", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消"
  })
      .then(() => {
        //设置加载状态为true
        loading.value = true;
        console.log(paths.value)
        //操作目录
        controlDirectory("baidu","delete", paths.value).then((res) => {
          if (res.data["errno"] === 0) {
            ElMessage({
              type: "success",
              message: "目录删除成功",
            });
          } else {
            ElMessage({
              type: "error",
              message: "目录删除失败",
            });
          }
          //设置加载状态为false
          loading.value = false;
        });
      })
      .catch(() => {
        ElMessage({
          type: "error",
          message: "删除失败或操作已被取消",
        });
      });
};
// 取出每行的path属性
function handleSelectionChange(selection) {
  paths.value = selection.map((item) => '"' + item.path + '"');
}
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
    @selection-change="handleSelectionChange"
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
      <el-button type="primary" @click="open">新增目录</el-button>
      <el-button type="primary" @click="del">删除</el-button>
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
