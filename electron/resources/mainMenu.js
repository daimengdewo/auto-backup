import { app, BrowserWindow, dialog, Menu } from "electron";
import { mainWindow } from "../main.js";
import axios from "axios";

//禁用默认菜单
Menu.setApplicationMenu(null);
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
              width: 800,
              height: 600,
              parent: mainWindow,
              modal: true,
            });
            //获取登录页面
            loginWindow
              .loadURL(
                "https://openapi.baidu.com/oauth/2.0/authorize?" +
                  "response_type=code" +
                  "&client_id=DGxFsWGhyoBdmXS7SmnzAYrtRZwGzjKo" +
                  "&redirect_uri=oob" +
                  "&scope=basic,netdisk" +
                  "&device_id=47439672" +
                  "&display=popup" +
                  "&state=test" +
                  "&qrcode=1",
              )
              .catch(() => {
                console.log("error");
              });
            // loginWindow.webContents.on("did-finish-load", () => {
            //   const poll = async () => {
            //     try {
            //       const response = await axios.get(
            //         "https://example.com/api/data",
            //       ); // 发送 GET 请求
            //       const data = response.data; // 获取返回的数据
            //
            //       // 在这里对获取到的数据进行处理
            //       // ...
            //
            //       setTimeout(poll, 5000); // 每隔 5 秒轮询一次
            //     } catch (error) {
            //       console.error(error); // 处理请求出错的情况
            //     }
            //   };
            //   // 开始轮询
            //   poll().then((r) => {});
            // });
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
