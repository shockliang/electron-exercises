const electron = require('electron');
const {app, BrowserWindow} = electron;

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
})