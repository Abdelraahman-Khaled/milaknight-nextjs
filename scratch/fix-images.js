const fs = require('fs');
const file = 'app/data/blogs.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/<img class="img-fluid" src=/g, '<img class="img-fluid" loading="lazy" width="800" height="500" src=');
fs.writeFileSync(file, content);
console.log('Fixed img tags in blogs.js');
