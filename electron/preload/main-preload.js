const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getFilePath: (path) => ipcRenderer.send("get-file-path", path),
  loginPoll: (code) => ipcRenderer.send("login-poll", code),
});
