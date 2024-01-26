<script setup>
import { reactive, ref, onMounted } from "vue";
import { getResources } from "@/script/Resources.js";

const dataList = ref([]);
//isLiveType
const isLiveType = ref(false);
//表单内容
const form = reactive({
  source: "",
  target: "",
});
const formList = ref([]); // 保存el-form的数组
const addForm = () => {
  formList.value.push({}); // 添加一个空对象到formList中
};
const deleteForm = () => {
  formList.value.pop(); // 删除formList中的最后一个元素
};
//弹窗可见
const dialogFormVisible = ref(false);
// 获取资源颜色
const getColor = (isLive) => {
  //当前isLiveType
  isLiveType.value = isLive;
  //返回颜色
  return isLive === true ? "green" : "red";
};
//挂载结束时
onMounted(async () => {
  //获取资源
  getResources().then((list) => {
    dataList.value = list.value;
    console.log(list);
  });
});
const login = (row) => {
  // 处理登录逻辑
};
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
      <template #default="{ row }">
        <div style="display: flex; justify-content: center">
          <el-button
            type="success"
            @click="login(row)"
            :disabled="row.isLiveType"
          >
            登录
          </el-button>
          <el-button
            type="primary"
            @click="dialogFormVisible = true"
            style="margin-left: 10px"
          >
            自定义配置
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <!-- 表单 -->
  <el-dialog v-model="dialogFormVisible" title="自定义配置">
    <el-card shadow="hover">
      <el-form :model="form" v-for="(item, index) in formList" :key="index">
        <el-form-item
          label="来源路径"
          :label-width="80"
          style="margin-top: 20px"
        >
          <div style="display: flex; align-items: center">
            <el-input v-model="form.source" autocomplete="off" />
            <el-button type="primary" @click="" style="margin-left: 10px">
              选择
            </el-button>
          </div>
        </el-form-item>
        <el-form-item
          label="目标路径"
          :label-width="80"
          style="margin-bottom: 20px"
        >
          <div style="display: flex; align-items: center">
            <el-input v-model="form.source" autocomplete="off" />
            <el-button type="primary" @click="" style="margin-left: 10px">
              选择
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <div>
        <el-button icon="el-icon-plus" @click="addForm">添加表单</el-button>
        <el-button icon="el-icon-minus" @click="deleteForm">删除表单</el-button>
      </div>
    </el-card>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.dialog-footer {
  margin-right: 15px;
}
</style>
