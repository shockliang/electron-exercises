import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

let win;

function createWindow() {
    win = new BrowserWindow({width: 800, height:600});
    
    win.loadURL(url.format({
        pathname:path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', ()=> {
        win = null
    });

    win.openDevTools()
}
