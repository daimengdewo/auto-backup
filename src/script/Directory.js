import axios from "axios";
import { ref } from "vue";
import { counterStore } from "@/store/counterStore.js";

const list = ref([]);
const info = {
  list: list,
  has_more: 0,
  cursor: 0,
};
export async function getDirectory(dirPath, start, limit, isClear) {
  if (isClear) {
    list.value = [];
  }
  try {
    //获取资源列表
    let resList = counterStore().resList;
    //判断列表里是否有百度网盘
    if (resList.includes("baidu")) {
      //判断token是否存活
      let tokenType = counterStore().baiduTokenType;
      if (tokenType) {
        //获取token
        let token = counterStore().baiduToken;
        //获取文件目录
        const diRes = await axios.get(
          "/panApi/rest/2.0/xpan/multimedia?" +
            "method=listall&" +
            "path=" +
            dirPath +
            "&access_token=" +
            token +
            "&start=" +
            start +
            "&limit=" +
            limit,
        );
        //遍历
        for (const item of diRes.data.list) {
          const ctime = new Date(item["local_ctime"] * 1000);
          const mtime = new Date(item["local_mtime"] * 1000);

          const data = {
            filename: item["server_filename"],
            local_ctime: formatDate(ctime),
            local_mtime: formatDate(mtime),
            size: (item["size"] / (1024 * 1024 * 1024)).toFixed(3) + "GB",
            path: item["path"],
            //判断是否为目录
            isdir: item["isdir"] === 0,
          };
          //填充
          list.value.push(data);
        }
        //是否还有下一页
        info.has_more = diRes.data.has_more === 1;
        //下一页起点
        info.cursor = diRes.data.cursor;
      } else {
        console.log("弹窗提示离线");
      }
    }
  } catch (error) {
    console.error(error);
  }
  //填充
  info.list = list;
  // 在函数末尾返回 dataList
  return info;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
