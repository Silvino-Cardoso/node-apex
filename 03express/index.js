// importar o express


let express= require('express');

// criar variavel com as funcionalidades do express

let app = express();

// criado rotas

 app.get('/', (req, res) =>{
    res.send('<h1> Olá Express </h1>')
 });


 // : quer dizer que vai pegar uma variável, dessa forma acessar o endereço localhos:8080/silvino/33 retornará no textto essas informações
 app.get('/sobre/:nome/:idade', (req, res) =>{
    res.send('<h1> Ola ' + req.params.nome + ' você tem ' +  req.params.idade +'</h1>')
 });

 // criando servidor

 app.listen(8080)