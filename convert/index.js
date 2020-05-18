const electron = require('electron');
const ffmepg = require('fluent-ffmpeg');
const _ = require('lodash');
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
  const promises = _.map(videos, video => {
    return new Promise((resole, reject) => {
      ffmepg.ffprobe(video.path, (err, metadata) => {
        video.duration = metadata.format.duration;
        video.format = 'avi';
        resole(video);
      });
    });
  });

  Promise.all(promises)
    .then(results => mainWindow.webContents.send('metadata:complete', results));
});