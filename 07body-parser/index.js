let express= require('express');
let handlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let app = express();

let usuarios = []

app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) =>{
    res.render('form');
});

app.post('/cadastrar', (req, res) =>{
    usuarios.push({'nome' : req.body.usuario})
    res.render('form', {'cadastro':true, 'usuarios': usuarios});

});
app.get('/remover/:id', (req, res) =>{
    usuarios.splice(req.params.id, 1)
    res.render('form', {'removido':true, 'usuarios': usuarios});

});


app.listen(8080)