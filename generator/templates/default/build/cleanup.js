const fs = require('fs');
const path = require('path');
const { each } = require('lodash');

const files = fs.readdirSync(path.join(__dirname, '../dist'));
each(files, (file) => {
  if (file.indexOf('common') >= 0) {
    fs.unlink(path.join(__dirname, '../dist', file), () => { });
    return;
  }

  const nameParts = file.split('.');
  const umdIndex = nameParts.indexOf('umd');
  if (umdIndex >= 0) {
    nameParts.splice(umdIndex, 1);
  }

  const minIndex = nameParts.indexOf('min');
  const isCss = nameParts.indexOf('css') >= 0;
  if (minIndex < 0 && !isCss) {
    fs.unlink(path.join(__dirname, '../dist', file), () => { });
    return;
  }

  if (!isCss) {
    nameParts.splice(minIndex, 1);
  }

  fs.renameSync(path.join(__dirname, '../dist', file), path.join(__dirname, '../dist', nameParts.join('.')));
});
