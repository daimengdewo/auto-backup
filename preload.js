const { contextBridge, ipcRenderer } = require('electron')

const handleSend = async () => {
    let fallback = await ipcRenderer.invoke('send-event', 'test')
}

contextBridge.exposeInIsolatedWorld.exposeInIsolatedWorld('api', {
    handleSend
})