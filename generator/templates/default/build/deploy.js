const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { assign } = require('lodash');
const FormData = require('form-data');
const manifest = require('./manifest.json');

const deployEndpoint = 'https://chameleon-ride.nsoft.com:8090/bundles';
const deployMethod = manifest.version > 1 ? 'put' : 'post';

const resolveDist = filePath => path.join(__dirname, '../dist/', filePath);

console.log('Deploying bundle ...');

const data = fs.createReadStream(resolveDist('bundle.zip'));
const form = new FormData();
form.append('bundle', data, 'bundle.zip');

axios[deployMethod](deployEndpoint, form, {
  headers: assign({
    authorization: `Bearer ${process.argv[2]}`,
  }, form.getHeaders()),
}).then((response) => {
  console.log('Successfully deployed bundle =>', JSON.stringify(response.data));
}).catch((error) => {
  const result = error.response.data;
  const message = result.message || result;
  console.log('Error deploying bundle =>', JSON.stringify(message));
});
