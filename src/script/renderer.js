const btn = document.getElementById('btn')
const openFile = document.getElementById("openFile")
btn.addEventListener('click', async () => {
    //传递输入框的值
    await window.electronAPI.getFilePath(openFile.value)
})