const { contextBridge, ipcRenderer } = require('electron');
const uuid = require('uuid');

contextBridge.exposeInMainWorld('vm', {
  exec(src) {
    const id = uuid.v4();
    return new Promise((resolve, reject) => {
      ipcRenderer.send('vm', { id, src });
      ipcRenderer.on(id, (_, data) => {
        resolve(data);
      });
      ipcRenderer.on(`error-${id}`, (_, err) => {
        reject(err);
      });
    });
  },
});
