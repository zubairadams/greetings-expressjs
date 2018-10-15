const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const greetings = require('./greetings-factory');
// const flash = require('express-flash');
const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greetings'
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.DATABASE_URL && !LOCAL) {
    useSSL = true;
}
let pool = new Pool({
    connectionString,
    ssl: useSSL
});
const greetinst = greetings(pool);
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
    try {
        let Count = await greetinst.count()
        res.render('index', {
            Count
        })
    } catch (error) {
        next(error);
    }
});

app.post('/resetBn', async function (req, res) {
    // let greet = Greet.resetBn
    let reset = await greetinst.resetBtn();
    // console.log(reset)
    let Count = await greetinst.count();
    res.render('index', {
        Count,
        reset
    })
});
app.post('/greetings', async function (req, res, next) {
    try {
        let name = req.body.textBox;
        let language = req.body.language;
        // res.redirect("/")
        console.log(name, language)

        let GREET = await greetinst.greet(name, language);
        let Count = await greetinst.count();
        let Names = await greetinst. Name();
        // console.log('here',key1);
        res.render('index', {
            GREET,
            Count,
            Names
        });
    } catch (error) {
        next(error);
    }
});
app.get('/greets', async function (res, req, next) {
    try{
    let greeted = await greetinst. Name();
    res.render('index',{
        greeted
    })
}catch(error){
next(error);
}
});
app.post("action", async function (req, res) {

    res.render('index', {

    })
});

let PORT = process.env.PORT || 4002;
app.listen(PORT, function () {
    console.log('App started on port', PORT);
});