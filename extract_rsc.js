const fs = require('fs');
const html = fs.readFileSync('local_admin.html', 'utf8');
const scripts = html.matchAll(/<script>self\.__next_f\.push\(\[1,"(.*?)"]\)<\/script>/g);
let out = '';
for (const match of scripts) {
  out += match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
}
fs.writeFileSync('rsc_tree.txt', out);
