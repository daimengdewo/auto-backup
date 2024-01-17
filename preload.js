const { contextBridge, ipcRenderer } = require('electron')

const handleSend = async () => {
    await ipcRenderer.invoke('send-event', 'test')
}

contextBridge.exposeInMainWorld('electronAPI', {
    handleSend
})