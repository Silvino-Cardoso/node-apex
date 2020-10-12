let express = require('express');
let handlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let fetch = require("node-fetch");

let app = express();

// especificar onde ficam arquivos estáticos JS, CSS e Imagens

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');



app.get('/', (req, res) =>{
    
       
    fetch('http://localhost:3000/products' , {method: "GET"})
    .then(retorno => retorno.json())
    .then(dadosDoJson => res.render('page', {vetor: dadosDoJson}))
  
   
});




app.post('/cadastrar', (req, res) => {

    let product = req.body.product;
    let price = req.body.price;
    let image = req.body.image;
    
    let dados = {"product": product , "price": price, "image": image};    

   fetch('http://localhost:3000/products',{
       method: 'POST',
       body: JSON.stringify(dados),
       headers: {'Content-type' : 'application/json'}
   })
   .then(res.redirect('/'))
   
});

app.get('/remover/:id', (req, res) =>{

    let id = req.params.id

    fetch('http://localhost:3000/products/'+ id, {
        method: 'DELETE',
        headers: {'Content-type' : 'application/json'},
    })
    .then(res.redirect('/'));
});

app.listen(8080)