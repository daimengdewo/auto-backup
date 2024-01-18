export interface IElectronAPI {
    // getFilePath 方法时preload.ts中使用的方法，后面添加方法，此处也要同步申明
    getFilePath: (attribute: string) => Promise<string>;
}
declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}
