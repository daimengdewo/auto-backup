const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  loginPoll: (code) => ipcRenderer.send("login-poll", code),
  getToken: async (type) => await ipcRenderer.invoke("get-token", type),
  setTokenType: (type,isLive) => ipcRenderer.send("set-token-type",type,isLive)
});
