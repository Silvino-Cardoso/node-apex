let express = require('express');
let handlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let fetch = require("node-fetch");

let app = express();
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.engine('handlebars', handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    
    fetch('http://localhost:3000/recipes' , {method: "GET"})
    .then(retorno => retorno.json())
    .then(dadosDoJson => res.render('page', {vetor: dadosDoJson}))
});

app.post('/cadastrar', (req, res) => {
    let recipeTitle = req.body.recipeTitle;
    let image = req.body.image;
    let ingredients = req.body.ingredients;
    let directions = req.body.directions;
    
    let recipes = {
        "recipeTitle": recipeTitle ,
        "image": image,
        "ingredients": ingredients,
        "directions" : directions
    };    

   fetch('http://localhost:3000/recipes',{
       method: 'POST',
       body: JSON.stringify(recipes),
       headers: {'Content-type' : 'application/json'}
   })
   .then(res.redirect('/'))

});

app.get('/details/:codigo', (req, res) => {

    fetch('http://localhost:3000/recipes/' +req.params.codigo, {
     method: "GET",
    })
    .then(retorno => retorno.json())
     .then(dadosDoJson => res.render('details', {vetor: dadosDoJson}))
});


app.get('/delete/:id', (req,res) =>{

    let id = req.params.id;

    fetch('http://localhost:3000/recipes/' + id, {
        method: 'DELETE',
        headers: {'Content-type' : 'application/json'},
    })
    .then(res.redirect('/'));
});



    
app.listen(8080);