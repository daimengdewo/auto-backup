import { app, BrowserWindow, dialog, Menu, ipcMain } from "electron";
import { mainWindow } from "../main.js";
import { poll } from "../script/mainMenuScript.js";
import axios from "axios";
import path from "path";

//主菜单
const mainMenu = (args, callBack) => {
  return Menu.buildFromTemplate([
    {
      label: "Setting",
      submenu: [
        //登录
        {
          label: "Login",
          click: () => {
            //创建登录窗体
            let loginWindow = new BrowserWindow({
              // width: 366,
              // height: 420,
              width: 800,
              height: 800,
              parent: mainWindow,
              modal: true,
              //无边框
              frame: false,
              //固定窗口大小
              resizable: false,
              webPreferences: {
                webSecurity: false,
                preload: path.join(
                  process.cwd(),
                  "./electron/preload/main-preload.js",
                ),
              },
            });
            //打开开发者工具
            loginWindow.webContents.openDevTools();
            //获取登录页面
            loginWindow.loadURL("http://localhost:5173/login").catch(() => {
              console.log("error");
            });
            loginWindow.webContents.on("did-finish-load", () => {
              //等待渲染进程发起轮询
              ipcMain.on("login-poll", (event, code) => {
                poll(code).then((r) => {});
              });
            });
          },
        },
        {
          label: "Mount-Target",
          click: () => {
            dialog
              .showOpenDialog({
                buttonLabel: "选择",
                defaultPath: app.getPath("desktop"),
                properties: [
                  "multiSelections",
                  "createDirectory",
                  "openFile",
                  "openDirectory",
                ],
              })
              .then((result) => {
                //选择的文件路径
                console.log(result.filePaths);
                callBack(args);
              });
          },
          accelerator: "Shift+Alt+G",
        },
        { label: "Language", submenu: [{ label: "English" }] },
      ],
    },
  ]);
};

export default mainMenu;
