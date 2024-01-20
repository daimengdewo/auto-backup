const image = document.getElementById("image");
image.addEventListener("load", async () => {
  // 图像加载完成后执行的代码
  await console.log("1");
  // await window.electronAPI.loginPoll(code.value);
});
