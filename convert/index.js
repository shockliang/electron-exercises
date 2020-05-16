const electron = require('electron');
const ffmepg = require('fluent-ffmpeg');
const {app, BrowserWindow, ipcMain} = electron;

let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on('videos:added', (event, videos) => {
  const promise = new Promise((resolve, reject) => {
    ffmepg.ffprobe(videos[0].path, (err, metadata) => {
      resolve(metadata);
    });
  });

  promise.then((metadata) => {console.log(metadata)});

});