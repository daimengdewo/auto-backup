<script setup>
import { onMounted, reactive, ref } from "vue";
import { getResources } from "@/script/Resources.js";
import { CirclePlusFilled, RemoveFilled } from "@element-plus/icons-vue";

//data
const dataList = ref([]);
//isLiveType
const isLiveType = ref(false);
//表单内容
const form = reactive({
  source: "",
  target: "",
  isCompress: true,
  date1: "",
  date2: "",
  type: "",
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
//打开自定义配置窗口
const custom = (row) => {
  dialogFormVisible.value = true;
  form.type = row.typeTag;
};
//保存计划任务
const setPlan = async () => {
  dialogFormVisible.value = false;
  let formJson =JSON.stringify(form);
  window.electronAPI.setPlan(formJson)
};
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
            @click="custom(row)"
            style="margin-left: 10px"
          >
            自定义配置
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <!-- 表单 -->
  <el-dialog v-model="dialogFormVisible" title="自定义配置" width="420px">
    <el-card shadow="hover">
      <el-form :model="form" v-for="(item, index) in formList" :key="index">
        <el-form-item label="来源路径" :label-width="80">
          <div style="display: flex; align-items: center">
            <el-input
              v-model="form.source"
              autocomplete="off"
              style="width: 246px"
            />
            <!--            <el-button type="primary" @click="getDir" style="margin-left: 10px">-->
            <!--              选择-->
            <!--            </el-button>-->
          </div>
        </el-form-item>
        <el-form-item label="目标路径" :label-width="80">
          <div style="display: flex; align-items: center">
            <el-input
              v-model="form.target"
              autocomplete="off"
              style="width: 246px"
            />
            <!--            <el-button type="primary" @click="" style="margin-left: 10px">-->
            <!--              选择-->
            <!--            </el-button>-->
          </div>
        </el-form-item>
        <el-form-item label="备份时间" style="margin-left: 12px">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="form.date1"
                type="date"
                placeholder="请选择日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="1"> </el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                v-model="form.date2"
                placeholder="请选择时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          label="是否启用自动压缩："
          prop="delivery"
          :label-width="140"
          style="margin-left: 10px"
        >
          <el-switch v-model="form.isCompress" />
        </el-form-item>
        <!-- 添加分割线 -->
        <div class="divider"></div>
      </el-form>
      <!-- 增减计划 -->
      <div style="display: flex; justify-content: center">
        <el-button @click="addForm" type="primary" :icon="CirclePlusFilled">
          新增备份计划
        </el-button>
        <el-button @click="deleteForm" type="primary" :icon="RemoveFilled">
          移除备份计划
        </el-button>
      </div>
    </el-card>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="setPlan">
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

.divider {
  margin: 20px auto;
  height: 1px;
  width: 100%;
  background-color: #e0e0e0; /* 设置为灰色 */
}
</style>
