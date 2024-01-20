import { app, BrowserWindow, dialog, Menu, ipcMain } from "electron";
import { mainWindow } from "../main.js";
import axios from "axios";

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
            });
            //打开开发者工具
            loginWindow.webContents.openDevTools();
            //获取登录页面
            loginWindow.loadURL("http://localhost:5173/login").catch(() => {
              console.log("error");
            });
            loginWindow.webContents.on("did-finish-load", () => {
              const poll = async () => {
                try {
                  const response = await axios.get(
                    "https://openapi.baidu.com/oauth/2.0/token?" +
                      "grant_type=device_token" +
                      "code=" +
                      "&client_id=DGxFsWGhyoBdmXS7SmnzAYrtRZwGzjKo" +
                      "&client_secret=KOGdaOwuK9bAgrxMO7lQ4LSDWtNGW0XZ",
                  ); // 发送 GET 请求
                  const data = response.data; // 获取返回的数据

                  // 在这里对获取到的数据进行处理
                  // ...

                  setTimeout(poll, 5000); // 每隔 5 秒轮询一次
                } catch (error) {
                  console.error(error); // 处理请求出错的情况
                }
              };
              //监听渲染进程
              ipcMain.on("login-poll", (event, args) => {
                console.log(args);
                // 开始轮询
                // poll().then((r) => {});
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
