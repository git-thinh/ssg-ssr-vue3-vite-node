const NAME_SOURCE = 'v02';

import fs from 'node:fs'
import PATH from 'node:path'
import AdmZip from 'adm-zip'
const key = getTime();
const zipDIR = process.cwd();
const zipSAVE = PATH.resolve(process.cwd(), '../');

console.log('zipDIR = ', zipDIR);
console.log('zipSAVE = ', zipSAVE);

async function srcZip() {
  let fileZIP = `${zipSAVE}/${key}--${NAME_SOURCE}.zip`;
  try {
    const zip = new AdmZip();
    fs.readdirSync(zipDIR).forEach(name => {
      if (name !== 'node_modules' &&
        name !== 'dist' &&
        name !== 'runtime' &&
        name !== 'temp' &&
        name !== 'test' &&
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
    console.log(`ZIP_OK: ${fileZIP}`);
  } catch (e) {
    console.log(`Something went wrong. ${e} = `, fileZIP);
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
