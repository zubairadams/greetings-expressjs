const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const Greetings = require('./greetings-factory');
const flash = require('express-flash');
const session = require('express-session');
const routesGreet = require('./routes/routes.js');
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
const greetinst = Greetings(pool);
const routes = routesGreet(greetinst)
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use(flash());
app.use(session({
    secret: '<add a secret string here>',
        resave: false,
        saveUninitialized: true
    }));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.get("/",routes.index);
app.post("/resetBn",routes.resetBn)
app.post("/greetings",routes.greetings1)
app.get('/action/:person',routes.greetings1)
app.get('/greeted',routes.greeted)
let PORT = process.env.PORT || 4001;
app.listen(PORT, function () {
    console.log('App started on port', PORT);
});