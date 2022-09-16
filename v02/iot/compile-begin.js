const fs = require('fs');

require('dotenv').config();

fs.rmSync('./build', {
  recursive: true,
  force: true
});

let s1 = '\n';
let s2 = '\n';

let a3 = fs.readdirSync('./src/templates').filter(o => o.endsWith('.vue'));
//console.log(a2);
if (a3.length > 0) {
  s1 += '\n\n';
  s2 += '\n\n';

  a3.forEach(file => {
    var key = file.substring(0, file.length - 4);
    s1 += `import ${key} from "./templates/${key}.vue";\n`;
    s2 += `\t\t\tcase "${key}": return ${key};\n`;
  });
}

//console.log(s1);
//console.log(s2);
const js = fs.readFileSync('./template.js', 'utf-8');
const output = js.split('//[IMPORT_COMPONENT]').join(s1).split('//[CASE_COMPONENT]').join(s2);
//console.log(output);
fs.writeFileSync('./src/interface.js', output);
