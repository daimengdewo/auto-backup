import { app, dialog, Menu } from "electron";
const mainMenu = (args,callBack) => {
  return Menu.buildFromTemplate([
    {
      label: 'Setting',
      submenu: [
        {
          label: 'Mount-Target', click: () => {
            dialog.showOpenDialog({
              buttonLabel: '选择',
              defaultPath: app.getPath('desktop'),
              properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
            }).then((result) => {
              //选择的文件路径
              console.log(result.filePaths)
              callBack(args)
            })
          },
          accelerator: 'Shift+Alt+G'
        },
        { label: 'Language', submenu: [{ label: 'English' }] },
      ]
    }
  ])
}

export default mainMenu;