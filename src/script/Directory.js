import axios from "axios";
import { ref } from "vue";
const list = ref([]);
export async function getDirectory(dirPath) {
  //数据组装
  const data = {
    filename: "",
    local_ctime: "",
    local_mtime: "",
    size: "",
  };
  try {
    //获取资源列表
    let resList = await window.electronAPI.getResList();
    //判断列表里是否有百度网盘
    if (resList.includes("baidu")) {
      //判断token是否存活
      let tokenType = await window.electronAPI.getTokenType("baidu");
      if (tokenType) {
        //获取token
        let token = await window.electronAPI.getToken("baidu");
        //获取文件目录
        const diRes = await axios.get(
          "/panApi/rest/2.0/xpan/multimedia?method=listall&path=" +
            dirPath +
            "&access_token=" +
            token,
        );
        //组装数据
        console.log(diRes);
      }
    }
  } catch (error) {
    console.error(error);
  }

  // 在函数末尾返回 dataList
  return list;
}
