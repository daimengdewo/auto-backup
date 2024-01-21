import {ipcMain} from "electron";
import fs from "fs";
import path from "path";
import {poll} from "./BaiduLoginScript.js";

// 读取配置文件
const configPath = path.join(process.cwd(), "./auto-backup-config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

//监听渲染进程
ipcMain.handle("get-token", (event, type) => {
    let token = ""
    //返回token
    switch (type){
        case "baidu":
            token = config.data.baiduToken
            break
    }
    return token;
});

ipcMain.on("set-token-type", (event, type , isLive) => {
    //设置token状态
    switch (type){
        case "baidu":
            config.data.baiduTokenIsLive = isLive;
            break
    }
    fs.writeFileSync(configPath, JSON.stringify(config));
});