const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const greetings = require('./greetings-factory');

const greet = greetings();


app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');


app.use(express.static('public'));


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
res.render("index", {
 greetings: greet.Rest(), 
});
});

app.get('/the-route', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
});
app.get('/actions/:type', function (req, res) {

});
let PORT = process.env.PORT || 4020;

app.listen(PORT, function () {
    console.log('App started on port', PORT);
});