const fs = require('fs');
const outputFileJs = './build/___iot.umd.min.js';

require('dotenv').config();
let __pathSrc = '../public';

if (!fs.existsSync(__pathSrc)) fs.mkdirSync(__pathSrc);
if (!fs.existsSync(__pathSrc + '/sdk')) fs.mkdirSync(__pathSrc + '/sdk');

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
if (fs.existsSync('./build/___iot.css'))
	fs.createReadStream('./build/___iot.css').pipe(fs.createWriteStream(__pathSrc + '/sdk/style.min.css'));
fs.createReadStream(outputFileJs).pipe(fs.createWriteStream(__pathSrc + '/sdk/script.min.js'));

fs.writeFileSync('./build/_log.txt', 'BUILD_DONE: ' + (new Date()).toString());
