let express= require('express');

let app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pagina.html')
});

app.listen(8080)