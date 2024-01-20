const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getFilePath: (path) => ipcRenderer.send("get-file-path", path),
  loginPoll: (code) => ipcRenderer.send("login-poll", code),
  getToken: async (type) => await ipcRenderer.invoke("get-token", type),
});
