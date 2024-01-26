import axios from "axios";
import { ref } from "vue";
const list = ref([]);
export async function getResources() {
  //数据组装
  const data = {
    type: "百度网盘",
    typeTag: "baidu",
    username: "未知",
    total: "未知",
    used: "未知",
    isLiveText: "离线",
    isLiveType: false,
  };
  try {
    //获取资源列表
    let resList = await window.electronAPI.getResList();
    //判断列表里是否有百度网盘
    if (resList.includes("baidu")) {
      //获取token
      let token = await window.electronAPI.getToken("baidu");
      //获取用户数据
      const userRes = await axios.get(
        "/panApi/rest/2.0/xpan/nas?" +
          "method=uinfo&" +
          "access_token=" +
          token,
      );
      //判断token是否在线
      if (userRes.data["baidu_name"]) {
        const panRes = await axios.get(
          "/panApi/api/quota?" +
            "access_token=" +
            token +
            "checkfree=1&" +
            "checkexpire=1",
        );
        //账号名
        data.username = userRes.data["baidu_name"];
        //总容量
        data.total =
          (panRes.data["total"] / (1024 * 1024 * 1024)).toFixed(3) + "GB";
        //已用容量
        data.used =
          (panRes.data["used"] / (1024 * 1024 * 1024)).toFixed(3) + "GB";
        //是否在线
        data.isLiveText = "在线";
        data.isLiveType = true;
        //组装
        if (list.value.length > 0) {
          //直接覆盖
          list.value[0] = data;
        } else {
          //没有就填充
          list.value.push(data);
        }
      } else {
        window.electronAPI.setTokenType("baidu", false);
      }
    }
  } catch (error) {
    console.error(error);
  }

  // 在函数末尾返回 dataList
  return list;
}
