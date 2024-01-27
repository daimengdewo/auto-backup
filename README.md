# README.md

#### 介绍
该项目开发初衷是我所供职的公司需要一个跨平台，易用，稳定，免费的文件与云盘的同步工具，还得能简单管理云盘，以备份服务器上的如软件配置，各种业务资料，图片存档，系统数据等。而这样的工具在网上要不就是停止维护了，要不就是收费挺贵，干脆我就自己写算了。

因为我发现，目前Windows Server仍被许多企业，学校，甚至是医院所使用着，很多用户出于成本考虑纷纷选择了用网盘做备份，而且相当一部分用户只是普通网管，可能不太擅长于编程相关工作，如果需要备份的目录结构比较复杂，或者又要同时备份到不同的云盘，便可能导致相对繁琐复杂。

便推出这款开源工具，也没什么技术含量，最大的优点就是我们公司自己本身也在用，所以肯定是在不断迭代优化的，起码不会出现突然停止维护的情况。

#### 软件功能
1. 可以同时登录多种网盘（如度盘，阿里等等），提供简单的目录增删改功能
2. 可以配置文件目录的备份计划：如  **A 目录在何时 保存到 B 目录** ，在此基础上，可以 **跨网盘配置** ，比如  **自动把 x盘的文件下载后 再备份到 x盘**  （等更新吧）
3. 可自定义文件或目录在上传前，以及上传后的操作：如上传前 **先备份 切片** 然后上传 ---> 结束后 **自动执行某个命令，或调用某个程序** 
4. （待更新）

#### 安装教程
windows 用户直接安装使用。
linux/mac 等待对应版本发布

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

#### 本人相关

我的bilibili主页：https://space.bilibili.com/522582
