import { dialog, Menu } from "electron";
const contextMenu = (args,callBack) => {
    return Menu.buildFromTemplate([
        {
            label: 'Test',
            submenu: [
                {
                    label: 'Test', click: () => {
                        //消息弹窗
                        const answers = ['Yes', 'No', 'Maybe']
                        dialog.showMessageBox({
                          title: 'Message Box',
                          message: 'Please select an option',
                          detail: 'Message details.',
                          buttons: answers
                        }).then(({response}) => {
                          console.log(`User selected: ${answers[response]}`)
                        })
                    }
                }
            ]
        }
    ])
}

export default contextMenu;