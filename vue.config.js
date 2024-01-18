module.exports = {
    pluginOptions: {
        electronBuilder: {
            contextIsolation: false,
            nodeIntegration: true,
            preload: 'src/preload.js',
        }
    }
}