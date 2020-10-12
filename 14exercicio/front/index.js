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
    
    fetch('http://localhost:3000/music' , 
    {method: "GET"})
    .then(retorno => retorno.json())
    .then(dadosDoJson => res.render('page', {vetor: dadosDoJson}))
});

app.post('/search', (req, res) =>{
    
    let artist = req.body.artist;
    let music = req.body.music;

    
    fetch('http://localhost:3000/music', {method:"GET"})
    .then(retorno => retorno.json())
    .then(retorno => {
        for(let i=0; i<retorno.length; i++){
            if(retorno[i].artist == artist && retorno[i].music == music){
                return retorno[i];
            }
        }
    })
    .then(r => {
        if(r == undefined){
            res.render('song', {notFound:true});
        }else{
            res.render('song', {vetor:r, found:true});
        }
    })

})

app.listen(8080)