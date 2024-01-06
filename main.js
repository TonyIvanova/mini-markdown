const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 600,
    hwight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.setAlwaysOnTop(true, "floating");
  win.loadURL(`file://${__dirname}/dist/todo/browser/index.html`);

  //dev tools
  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });

  ipcMain.on("close-app", () => {
    // Close the window
    win.close();
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
