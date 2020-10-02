let express= require('express');
let handlebars = require('express-handlebars');

let app = express();

app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// rotas

app.get('/', (req, res) =>{
    res.render('index');
});

app.get('/sobre', (req, res) =>{
    res.render('sobre');
});

app.get('/contato', (req, res) =>{
    res.render('contato');
})

app.listen(8080)