const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const {globalShortcut} = require('electron');
const {clipboard} = require('electron');

let mainWindow;

let fullscreen = false;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    fullscreenable: true,
    resizable: false,
    center: true,
    minimizable: true,
    webPreferences: {
      plugins: true,
      sandbox: true,
      nodeIntegration: false,
    }
  })
    
    
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
    
  globalShortcut.register('CommandOrControl+F', () => {
      fullscreen = !fullscreen;
      
      if(fullscreen){
          let display = electron.screen.getPrimaryDisplay();
          let height = display.bounds.height;
          let width = display.bounds.width;
          mainWindow.setMaximumSize(width, height);
      }
    
      mainWindow.setFullScreen(fullscreen);
  })
    
  globalShortcut.register('CommandOrControl+D', () => {
    console.log('DevTools');
    mainWindow.webContents.openDevTools();
  })
  
  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})