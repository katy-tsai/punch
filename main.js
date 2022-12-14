const { app, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 550,
    height: 100,
    show: false,
    //frame: false,
    //transparent: true,
    //autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");

  win.on("minimize", () => {
    win.hide();
  });
  createTray();
  win.once("ready-to-show", () => {
    win.show();
  });
};

const createTray = () => {
  let appIcon = null;
  const iconPath = path.join(app.getAppPath(), "icon.icns");
  console.log("iconPath", iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Punch",
      click() {
        win.show();
      },
    },
    {
      label: "Quit",
      click() {
        win.removeAllListeners("close");
        win.close();
      },
    },
  ]);

  appIcon = new Tray(nativeImage.createFromPath(iconPath));
  appIcon.setToolTip("Punch");
  appIcon.setContextMenu(contextMenu);
};
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
