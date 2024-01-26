import {Tray, Menu, dialog} from "electron";
import path from "path";
function createTray(app,mainWindow) {
    const tray = new Tray(path.resolve(process.cwd(), "./build/icon/auto.png"))
    //托盘tip
    tray.setToolTip('AutoBackup')
    //托盘点击事件
    tray.on('click',(event)=>{
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    })
    // //托盘右键菜单
    // tray.setContextMenu(Menu.buildFromTemplate([
    //     {
    //         label: 'Test',
    //         submenu: [
    //             {
    //                 label: 'Mount-Target', click: () => {
    //                     //消息弹窗
    //                     const answers = ['Yes', 'No', 'Maybe']
    //                     dialog.showMessageBox({
    //                         title: 'Message Box',
    //                         message: 'Please select an option',
    //                         detail: 'Message details.',
    //                         buttons: answers
    //                     }).then(({response}) => {
    //                         console.log(`User selected: ${answers[response]}`)
    //                     })
    //                 }
    //             }
    //         ]
    //     }
    // ]))
}
export default createTray;

