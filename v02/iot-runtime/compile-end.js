const fs = require('fs');
const outputFileJs = './build/___iot.umd.min.js';

require('dotenv').config();
let __pathSrc = process.env.PATH_SRC || '../v01';

if (!fs.existsSync(__pathSrc)) fs.mkdirSync(__pathSrc);
if (!fs.existsSync(__pathSrc + '/temp')) fs.mkdirSync(__pathSrc + '/temp');
if (!fs.existsSync(__pathSrc + '/dist')) fs.mkdirSync(__pathSrc + '/dist');
if (!fs.existsSync(__pathSrc + '/static')) fs.mkdirSync(__pathSrc + '/static');
if (!fs.existsSync(__pathSrc + '/dist/coms')) fs.mkdirSync(__pathSrc + '/dist/coms');
if (!fs.existsSync(__pathSrc + '/static/coms')) fs.mkdirSync(__pathSrc + '/static/coms');

let cs = '\n\nwindow["process"] = window["process"] || {}; window["process"]["client"] = true; \n' +
	'\nvar __run_names = {};\nwindow["__coms_run"] = { ';
fs.readdirSync('./src/templates').filter(o => o.endsWith('.vue')).forEach(file => {
	var key = file.substring(0, file.length - 4);
	cs += key + `:___iot.__getComponent("${key}"),`;
});
cs = cs.substring(0, cs.length - 1);
cs += ' };\n';
fs.appendFileSync(outputFileJs, cs);

fs.createReadStream('./index.html').pipe(fs.createWriteStream('./build/index.html'));
fs.createReadStream('./build/___iot.css').pipe(fs.createWriteStream(__pathSrc + '/static/coms/style.min.css'));
fs.createReadStream('./build/___iot.css').pipe(fs.createWriteStream(__pathSrc + '/dist/coms/style.min.css'));

fs.createReadStream(outputFileJs).pipe(fs.createWriteStream(__pathSrc + '/static/coms/script.min.js'));
fs.createReadStream(outputFileJs).pipe(fs.createWriteStream(__pathSrc + '/dist/coms/script.min.js'));

fs.writeFileSync('./build/_log.txt', 'BUILD_DONE: ' + (new Date()).toString());
