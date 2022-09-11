const NAME_SOURCE = 'sc';
const NAME_SOURCE_RUNTIME = 'sc-runtime';


const AdmZip = require("adm-zip");
const fs = require("fs");
const PATH = require('path');

const key = getTime();

async function srcZip() {
  let fileZIP = PATH.resolve(__dirname, '../' + key + '--' + NAME_SOURCE + '.zip');
  let fileZIP2 = PATH.resolve(__dirname, '../' + key + '--' + NAME_SOURCE_RUNTIME + '.zip');
  try {
    const zip = new AdmZip();
    fs.readdirSync('./').forEach(name => {
      if (name !== 'node_modules' &&
        name !== 'dist' &&
        name !== 'temp' &&
        name !== '.nuxt' &&
        name !== 'yarn.lock' &&
        name !== 'package-lock.json' &&
        name !== '.gitignore' &&
        name !== '.editorconfig') {
        if (name.indexOf('.') !== -1) {
          zip.addLocalFile('./' + name);
        } else {
          zip.addLocalFolder('./' + name, name);
        }
      }
    });
    zip.writeZip(fileZIP);

    const zip2 = new AdmZip();
    let dir = PATH.resolve(__dirname, '../' + NAME_SOURCE_RUNTIME) + '/';
    console.log(dir);
    fs.readdirSync(dir).forEach(name => {
      if (name !== 'node_modules' &&
        name !== 'build' &&
        name !== 'yarn.lock' &&
        name !== 'package-lock.json') {
        if (name.indexOf('.') !== -1) {
          zip2.addLocalFile(dir + name);
        } else {
          zip2.addLocalFolder(dir + name, name);
        }
      }
    });
    zip2.writeZip(fileZIP2);

    console.log(`ZIP_OK: ${fileZIP}`);
    console.log(`ZIP_OK: ${fileZIP2}`);
  } catch (e) {
    console.log(`Something went wrong. ${e} = `, fileZIP, fileZIP2);
  }
}

function getTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hh = date.getHours();
  var mm = date.getMinutes();
  var ss = date.getSeconds();
  return '' + year +
    (month < 10 ? "0" + month : month) +
    (day < 10 ? "0" + day : day) +
    '-' +
    (hh < 10 ? "0" + hh : hh) +
    (mm < 10 ? "0" + mm : mm) +
    (ss < 10 ? "0" + ss : ss);
};

srcZip();
