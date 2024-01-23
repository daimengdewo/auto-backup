import { app, BrowserWindow, dialog, Menu, ipcMain } from "electron";
import { mainWindow } from "../main.js";
import { poll } from "../script/BaiduLoginScript.js";
import path from "path";
import { BaiduTokenIsLive } from "../script/readFileScript.js";

//主菜单
const mainMenu = (args, callBack) => {
  return Menu.buildFromTemplate([
    {
      label: "资源配置",
      submenu: [
        {
          label: "资源登记",
          submenu: [
            //登录
            {
              label: "度盘登录       ",
              click: () => {
                //如果token依然存活则无需获取
                if (BaiduTokenIsLive) {
                  //消息弹窗
                  const answers = ["Yes", "No"];
                  dialog
                    .showMessageBox({
                      title: "error",
                      message: "百度网盘token尚未失效！无需重新登录！",
                      detail:
                        "Baidu Cloud Drive has not expired yet! No need to log in again!",
                      buttons: answers,
                    })
                    .then((r) => {});
                  return;
                }
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
                      "./electron/preload/mainPreload.js",
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
                    poll(code).then((r) => {
                      loginWindow.close();
                    });
                  });
                });
              },
            },
          ],
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
