import fs from "fs";
import path from "path";

// 读取配置文件
const configPath = path.join(process.cwd(), "./auto-backup-config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

//获取token
export function getBaiduToken() {
  return config.data.token;
}

// 保存 token
export function setBaiduToken(token) {
  config.data.token = token;
  fs.writeFileSync(configPath, JSON.stringify(config));
}
