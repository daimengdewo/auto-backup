import { app, dialog, ipcMain } from "electron";
import schedule from "node-schedule"
import cron from "node-cron"
import fs from "fs";
import path from "path";
import archiver from "archiver";

// 读取配置文件

const configPath = path.join(process.cwd(), "./auto-backup-config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

//判断百度token是否存活
export function BaiduTokenIsLive() {
  return config.data["baidu"].tokenIsLive;
}

// 保存 token
export function setBaiduToken(token) {
  config.data.baiduToken = token;
  fs.writeFileSync(configPath, JSON.stringify(config));
}

//获取路径
ipcMain.on("get-dir-path", (event) => {
  dialog
    .showOpenDialog({
      buttonLabel: "选择",
      defaultPath: app.getPath("desktop"),
      properties: ["createDirectory", "openFile", "openDirectory"],
    })
    .then((result) => {
      //选择的文件路径
      event.reply("dir-path-selected", result.filePaths);
    });
});

//保存备份计划任务配置
ipcMain.on("set-plan", (event, formJson) => {
  config.plans = JSON.parse(formJson);
  fs.writeFileSync(configPath, JSON.stringify(config));
});

//读取计划任务
ipcMain.handle("get-plan", () => {
  return config.plans;
});

//压缩并分片
async function compressDirOrFile(path) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const backupPath = `${path}/backs`;

  // 检查备份目录是否存在，如果不存在则创建
  if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath, { recursive: true });
  }

  // 更新输出流的路径
  const outputPath = `${backupPath}/${path.split('/').pop()}.zip`;
  const output = fs.createWriteStream(outputPath);

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`压缩包 ${outputPath} 已创建`);
      resolve();
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn(err);
      } else {
        reject(err);
      }
    });

    archive.on('error', (err) => {
      reject(err);
    });

    // 将压缩器的输出流连接到文件写入流
    archive.pipe(output);

    // 递归地将目录或文件添加到压缩包
    function addPathToArchive(path) {
      const stats = fs.statSync(path);

      if (stats.isDirectory()) {
        const files = fs.readdirSync(path);

        files.forEach((file) => {
          addPathToArchive(`${path}/${file}`);
        });
      } else if (stats.isFile()) {
        archive.file(path, { name: path });
      }
    }

    addPathToArchive(path);

    // 完成压缩操作
    archive.finalize();
  });
}

// 定时执行方法
function scheduleCompress(source,date) {
  try { // 首次立即执行一次
    compressDirOrFile(source).then(() => {
    });

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const cronExpression = `${second} ${minute} ${hour} * * *`;

    // 创建一个定时任务，指定要执行的操作
    schedule.scheduleJob(cronExpression, function () {
      // 在指定时间执行的任务
      compressDirOrFile(source).then(() => {
      });
    });
  } catch (e) {
    console.log(e)
  }
}

// 调用
config.plans.forEach((plan) => {
  const date = new Date(plan.date);
  const source = plan.source;

  // 调用 scheduleCompress 函数，并传入新的时间和 source
  scheduleCompress(source,date);
  console.log(`调度压缩任务，时间：${date}, 源文件：${source}`);
});
