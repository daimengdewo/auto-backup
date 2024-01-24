import axios from "axios";
import { setBaiduToken } from "./ReadFileScript.js";
import { dialog } from "electron";

//发起轮询等待用户登录
export async function poll(code) {
  let count = 0;
  let token = null;

  const interval = setInterval(async () => {
    if (token != null || count === 36) {
      clearInterval(interval); // 轮询结束
      setBaiduToken(token);
      console.log(token);
      return;
    }
    try {
      // 发起请求
      const response = await axios.get(
        "https://openapi.baidu.com/oauth/2.0/token?" +
          "grant_type=device_token" +
          "&code=" +
          code +
          "&client_id=DGxFsWGhyoBdmXS7SmnzAYrtRZwGzjKo" +
          "&client_secret=KOGdaOwuK9bAgrxMO7lQ4LSDWtNGW0XZ",
      );
      token = response.data["access_token"];
      // 计数器加1
      count++;
    } catch (error) {
      console.error("authorization_pending!");
    }
  }, 5000); // 每5秒执行一次轮询
}
