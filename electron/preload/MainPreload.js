const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  //百度登录
  loginPoll: (code) => ipcRenderer.send("login-poll", code),
  //获取配置中保存的token
  getToken: async (type) => await ipcRenderer.invoke("get-token", type),
  //获取资源列表
  getResList: async () => await ipcRenderer.invoke("get-res-list"),
  //获取token状态
  getTokenType: async (type) =>
    await ipcRenderer.invoke("get-token-type", type),
  //更新token状态
  setTokenType: (type, isLive) =>
    ipcRenderer.send("set-token-type", type, isLive),
  //获取路径
  getDirPath: async () => await ipcRenderer.send("get-dir-path"),
  waitPath: async () =>
    await ipcRenderer.on("dir-path-selected", (event, filePaths) => {
      // 在这里处理接收到的文件路径
      console.log("Received file paths:", filePaths);
    }),
  //保存备份计划任务配置
  setPlan: (formJson) => ipcRenderer.send("set-plan", formJson),
  //读取计划任务
  getPlan: (formJson) => ipcRenderer.invoke("get-plan")
});
