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

ipcMain.on('conversion:start', (event, videos) => {
  const videoAry = _.values(videos);
  _.each(videoAry, video => {
    const outputDirectory = video.path.split(video.name)[0];
    const outputName = video.name.split('.')[0];
    const outputPath = `${outputDirectory}${outputName}.${video.format}`;
    ffmepg(video.path)
      .output(outputPath)
      .on('end', () => mainWindow.webContents.send('conversion:end', {video, outputPath}))
      .run();
  });
});