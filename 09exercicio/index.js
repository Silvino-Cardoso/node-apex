// importando express
let express = require('express');

//importando handlebars
let handlebars = require('express-handlebars');

// importando body-parser
let bodyParser = require('body-parser');

// variável com funcionalidades express
let app = express();




app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine' , 'handlebars')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// criando rotas

app.get('/', (req, res) =>{
    res.render('index')
});

let dados = []

app.post('/cadastrar', (req, res) =>{
   
let nome = req.body.usuario;
let nota1 = parseFloat(req.body.nota1);
let nota2 = parseFloat(req.body.nota2);
let media = (nota1 + nota2) / 2
let situacao = media > 7 ? 'Aprovado' : 'Reprovado'

if( req.body.usuario !==''){

    dados.push({
        nome,
        nota1,
        nota2,
        media,
        situacao
 })}; delete req.body.usuario

       
    
     res.render('index',{'cadastro': true, 'notas' : dados})

    
});




app.get('/excluir/:id', (req, res) =>{
    dados.splice(req.params.id, 1);
    res.render('index', {'excluido': true ,'notas': dados})
})

app.listen(8080)