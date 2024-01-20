import {ipcMain} from "electron";
import fs from "fs";
import path from "path";

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