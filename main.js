const {app, BrowserWindow} = require('electron');


let win;

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  });
  win.loadURL(`file://${__dirname}/dist/index.html`);
  win.on('closed', function () {
    win = null
  });

  // Custom

  const SerialPort = require('serialport');
  const app = require('express')();
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);
  const sp = new SerialPort('/dev/ttyUSB0', {
    baudRate: 9600,
  });

  io.on('connection', function (socket) {
    console.log('Connected ' + socket.handshake.address);
    socket.on('end', function () {
      socket.disconnect(0);
      console.log('Disconnected ' + socket.handshake.address);
    });
  });
  server.listen(3000, '0.0.0.0', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Socket listening...');
  });

  sp.open(function () {
    sp.on('data', function (data) {
      io.emit('data', parseInt(data));
    });
  });

}

// Create window on electron intialization
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
