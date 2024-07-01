const { app, BrowserWindow, Menu, dialog, screen } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

// 是否是生产环境
const isPackaged = app.isPackaged;

// 禁止显示默认菜单
Menu.setApplicationMenu(null);

// 主窗口
let mainWindow;

const createWindow = () => {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        title: "Electron + Vue3",
        width: screen.getPrimaryDisplay().workAreaSize.width,
        height: screen.getPrimaryDisplay().workAreaSize.height,
        minWidth: 800,
        minHeight: 600,
        icon: path.resolve(__dirname, "../public/icon.ico"),
    });

    const load = () => {
        mainWindow.loadURL(
            isPackaged
                ? `file://${path.join(__dirname, "../dist/index.html")}`
                : "http://localhost:5200"
        );
    }

    // 自动更新
    const handleUpdate = () => {
        // 更新地址
        const updateURL = "https://js.houzi8.com/app_client/";
        // 设置是否自动下载，默认是true,当点击检测到新版本时，会自动下载安装包，所以设置为false
        autoUpdater.autoDownload = false;
        // 如果安装包下载好了，那么当应用退出后是否自动安装更新
        autoUpdater.autoInstallOnAppQuit = true;
        // 是否接受开发版，测试版之类的版本号
        autoUpdater.allowPrerelease = false;
        // 是否可以回退版本，比如从开发版降到旧的稳定版
        autoUpdater.allowDowngrade = false;
        autoUpdater.setFeedURL(updateURL);
        autoUpdater.on("error", function (error) {
            // 检查更新出错
        });
        autoUpdater.on("checking-for-update", function () {
            // 检查中
        });
        autoUpdater.on("update-not-available", function (info) {
            // 已经是最新版
        });
        autoUpdater.on("update-available", function (info) {
            // 检测到新版本
            dialog
                .showMessageBox(mainWindow, {
                    type: "info",
                    title: "更新提示",
                    defaultId: 0,
                    cancelId: 1,
                    message: "检测到新版本，是否立即更新？",
                    buttons: ["确定", "取消"],
                })
                .then((res) => {
                    if (res.response === 0) {
                        // 执行下载安装包
                        autoUpdater.downloadUpdate();
                    }
                });
        });
        autoUpdater.on("download-progress", function (progress) {
            // 下载进度
        });
        autoUpdater.on("update-downloaded", function (info) {
            // 新安装包下载完成
            dialog
                .showMessageBox(mainWindow, {
                    type: "info",
                    title: "更新提示",
                    defaultId: 0,
                    cancelId: 1,
                    message: "新版本下载完成，是否立即安装？",
                    buttons: ["确定", "取消"],
                })
                .then((res) => {
                    if (res.response === 0) {
                        // 退出应用并安装更新
                        autoUpdater.quitAndInstall();
                        mainWindow.destroy();
                    }
                });
        });

        // 执行自动更新检查
        autoUpdater.checkForUpdates();
    }

    if (isPackaged) {
        /* 
            打包状态下加载的是html，需要额外处理。
            加载失败之后触发。
        */
        mainWindow.webContents.on("did-fail-load", () => {
            load();
        });

        /* 
            // 将 file://example.com/xxx 的 文件改为 https 协议
            session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
                if (/^file:\/\/localhost\:5200\//.test(details.url)) {
                    callback({ redirectURL: details.url.replace(/^file/, "http") });
                } else {
                    callback(details);
                }
            });
        */

        /* 
            当用户或页面想要导航时触发。
            它可能发生在 window.location 对象改变或用户点击页面上的链接时，可能会发生这种情况。
            当使用如 webContents.loadURL 和 webContents.back APIs 以编程方式导航时，将不会触发此事件。
            页面内导航也不会触发，例如点击锚点或更新 window.location.hash。 可使用 did-navigate-in-page 事件。 
        */
        mainWindow.webContents.on("will-navigate", (event, url) => {
            event.preventDefault();
            load();
        });

        // 禁止使用快捷键刷新
        mainWindow.webContents.on("before-input-event", (event, input) => {
            mainWindow.webContents.setIgnoreMenuShortcuts(
                input.key.toLowerCase() === "f5" ||
                (input.control && input.key.toLowerCase() === "r") ||
                (input.meta && input.key.toLowerCase() === "r")
            );
        });
    }

    // 在窗口要关闭的时候触发
    mainWindow.on("close", (e) => {
        e.preventDefault();
        dialog
            .showMessageBox(mainWindow, {
                type: "info",
                title: "退出提示",
                defaultId: 0,
                cancelId: 1,
                message: "确定要退出吗？",
                buttons: ["退出", "取消"],
            })
            .then((res) => {
                if (res.response === 0) {
                    // e.preventDefault();
                    // mainWindow.destroy();
                    app.exit(0);
                }
            });
    });

    // mainWindow.webContents.openDevTools();

    load();
};

// 限制只能打开一个窗口
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    // 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") app.quit();
    });

    // 如果开发环境使用了 nginx 代理，禁止证书报错
    if (!isPackaged) {
        // 证书的链接验证失败时，触发该事件
        app.on(
            "certificate-error",
            function (event, webContents, url, error, certificate, callback) {
                event.preventDefault();
                callback(true);
            }
        );
    }

    app.on("second-instance", () => {
        // 当运行第二个实例时,将会聚焦到 mainWindow 这个窗口
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
            // mainWindow.show();
        }
    });

    // 在应用准备就绪时调用函数
    app.whenReady().then(() => {
        createWindow();

        app.on("activate", () => {
            // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
            // 打开的窗口，那么程序会重新创建一个窗口。
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    });
}
