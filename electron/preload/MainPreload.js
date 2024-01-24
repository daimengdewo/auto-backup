const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  //百度登录
  loginPoll: (code) => ipcRenderer.send("login-poll", code),
  //获取配置中保存的token
  getToken: async (type) => await ipcRenderer.invoke("get-token", type),
  //获取资源列表
  getResList: async () => await ipcRenderer.invoke("get-res-list"),
  //获取token状态
  getTokenType: async () => await ipcRenderer.invoke("get-token-type"),
  //更新token状态
  setTokenType: (type, isLive) =>
    ipcRenderer.send("set-token-type", type, isLive),
});
