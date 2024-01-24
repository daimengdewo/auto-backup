import { ipcMain } from "electron";
import fs from "fs";
import path from "path";

// 读取配置文件
const configPath = path.join(process.cwd(), "./auto-backup-config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

//读取配置文件中的token
ipcMain.handle("get-token", (event, type) => {
  //返回token
  return config.data[type].token;
});

//设置token状态
ipcMain.on("set-token-type", (event, type, isLive) => {
  config.data[type].tokenIsLive = isLive;
  fs.writeFileSync(configPath, JSON.stringify(config));
});

//获取token状态
ipcMain.handle("set-token-type", (event, type) => {
  return config.data[type].tokenIsLive;
});

//获取配置文件中的资源列表
ipcMain.handle("get-res-list", () => {
  return config.resList;
});
