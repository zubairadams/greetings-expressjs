const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const greetings = require('./greetings-factory');
// const flash = require('express-flash');
const pg = require("pg");
const Pool = pg.Pool;const connectionString = process.env.DATABASE_URL || "postgres://coder:pg123@localost:5432/"
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.DATABASE_URL && !LOCAL){
    useSSL = true;
}
let pool = new Pool({
    connectionString,
    ssl : useSSL
});
const Greet = greetings(pool);
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
// app.use(flash());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.get("/", async function (req, res) {
    res.render('index')
});
app.post("/resetBn", async function(req, res){
let greet =await greet.resetBn
    greet.resetBtn();
});
app.post('/greetings', async function (req, res, next) {
        let name = req.body.textBox;
        let language = req.body.language;
        // res.redirect("/")
        
        
            // Count: await greet.count()
        
        res.render('index', {
           key1: Greet.greet(name, language),
            // greet: greet.greet(name, language),
            //  count: Greet.count()
        });  
});
app.post("action",async function (req, res){

res.render('index',{
    

})
});
  
let PORT = process.env.PORT || 4200;
app.listen(PORT, function () {
    console.log('App started on port', PORT);
});
