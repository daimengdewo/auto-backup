import { app, dialog, ipcMain } from "electron";
import fs from "fs";
import path from "path";

// 读取配置文件
const configPath = path.join(process.cwd(), "./auto-backup-config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

//判断百度token是否存活
export function BaiduTokenIsLive() {
  return config.data["baidu"].tokenIsLive;
}

// 保存 token
export function setBaiduToken(token) {
  config.data.baiduToken = token;
  fs.writeFileSync(configPath, JSON.stringify(config));
}

//获取路径
ipcMain.on("get-dir-path", (event) => {
  dialog
    .showOpenDialog({
      buttonLabel: "选择",
      defaultPath: app.getPath("desktop"),
      properties: ["createDirectory", "openFile", "openDirectory"],
    })
    .then((result) => {
      //选择的文件路径
      event.reply("dir-path-selected", result.filePaths);
    });
});

//保存备份计划任务配置
ipcMain.on("set-plan", (event, formJson) => {
    let formData = JSON.parse(formJson);
    config.plans.push(formData)
    fs.writeFileSync(configPath, JSON.stringify(config));
});
