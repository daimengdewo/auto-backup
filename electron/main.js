// electron/main.js
import { app, BrowserWindow, ipcMain, globalShortcut, Menu } from "electron";
import path from "path";
//菜单对象
import mainMenu from "./resources/mainMenu.js";
import contextMenu from "./resources/contextMenu.js";
//托盘对象
import createTray from "./resources/tray.js";

// 是否是生产环境
const isPackaged = app.isPackaged;

// 主窗口
export let mainWindow;
let webContents;

const createWindow = () => {
  // 创建主窗口
  mainWindow = new BrowserWindow({
    show: false,
    // 默认窗口标题，如果由loadURL()加载的HTML文件中含有标签<title>，此属性将被忽略。
    width: 800,
    height: 600,
    //固定窗口大小
    resizable: false,
    // 窗口图标。 在 Windows 上推荐使用 ICO 图标来获得最佳的视觉效果, 默认使用可执行文件的图标.
    // 在根目录中新建 build 文件夹存放图标等文件
    icon: path.resolve(process.cwd(), "./build/icon/auto.png"),
    // 预加载
    webPreferences: {
      webSecurity: false,
      preload: path.join(process.cwd(), "./electron/preload/main-preload.js"),
    },
  });
  // 开发环境下，打开开发者工具。
  if (!isPackaged) {
    mainWindow.webContents.openDevTools();
  }
  // 加载vue
  // 如果使用了 nginx 代理，url 改为代理地址
  mainWindow.loadURL("http://localhost:5173/home");

  // 页面加载完毕后
  mainWindow.once("ready-to-show", () => {
    //创建托盘
    createTray(app, mainWindow);
    //加载快捷键
    globalShortcut.register("Alt+M", () => {
      console.log("Alt+M 注册成功");
    });
    //加载主菜单
    Menu.setApplicationMenu(
      mainMenu("传参测试", (args) => {
        //获取回调
        console.log(args);
      }),
    );
    //加载右键菜单
    mainWindow.webContents.on("context-menu", (event) => {
      contextMenu().popup();
    });
    //显示主窗口
    mainWindow.show();
  });
};

// 在应用准备就绪时调用函数
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    // macOS
    // 当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

//监听渲染进程
ipcMain.on("get-file-path", (event, args) => {
  console.log(args);
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 如果开发环境使用了 nginx 代理，禁止证书报错
if (!isPackaged) {
  // 证书的链接验证失败时，触发该事件
  app.on(
    "certificate-error",
    function (event, webContents, url, error, certificate, callback) {
      event.preventDefault();
      callback(true);
    },
  );
}
