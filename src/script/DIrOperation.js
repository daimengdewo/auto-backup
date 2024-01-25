import axios from "axios";
import { counterStore } from "@/store/counterStore.js";

export async function createDirectory(resourceType, path, name) {
  //判断当前标签
  switch (resourceType) {
    case "baidu":
      //判断token是否存活
      let tokenType = counterStore().baiduTokenType;
      if (tokenType) {
        //获取token
        let token = counterStore().baiduToken;
        //路径处理
        if (path === "/") {
          path = path + name;
        } else {
          path = path + "/" + name;
        }
        //新建目录
        return await axios.post(
          "/panApi/rest/2.0/xpan/file?" +
            "method=create&" +
            "access_token=" +
            token,
          "path=" + path + "&isdir=1&rtype=1",
        );
      }
  }
}

export async function deleteDirectory(resourceType, path, name, opera, del) {
  //判断当前标签
  switch (resourceType) {
    case "baidu":
      //判断token是否存活
      let tokenType = counterStore().baiduTokenType;
      if (tokenType) {
        //获取token
        let token = counterStore().baiduToken;
        //路径处理
        if (path === "/") {
          path = path + name;
        } else {
          path = path + "/" + name;
        }
        //新建目录
        return await axios.post(
          "/panApi/rest/2.0/xpan/file?" +
            "method=filemanager&" +
            "access_token=" +
            token +
            "&opera=" +
            opera,
          "async=1&filelist=" + del,
        );
      }
  }
}
