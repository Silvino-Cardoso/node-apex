// importar modulo http ( nativo do NODE

let htttp = require('http');

htttp.createServer((req, resp) =>{

    resp.end('<h1> Aprendendo NodeJs </h1>')

}).listen(8080);