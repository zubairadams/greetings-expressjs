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
    // const routes = routesGreet(greetings);
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// app.get("/", async function (req, res) {
//     try {
//         let Count = await greetinst.count()
//         res.render('index', {
//             Count
//         })
//     } catch (error) {
//         next(error);
//     }
// });
app.get("/",routes.index);

// app.post('/resetBn', async function (req, res) {
//     // let greet = Greet.resetBn
//     let reset = await greetinst.resetBtn();
//     // console.log(reset)
//     let Count = await greetinst.count();
//     res.render('index', {
//         Count,
//         reset
//     })
// });
app.post("/resetBn",routes.resetBn)
app.post("/greetings",routes.greetings1)
// app.post('/greetings', async function (req, res, next) {
//     try {
//         let name = req.body.textBox;
//         let language = req.body.language;
//         // res.redirect("/")
//         console.log(name, language)
//         if(name !== '' && language !== undefined){
//         let GREET = await greetinst.greet(name, language);
//         let Count = await greetinst.count();
//         let Names = await greetinst.Name();
       
//         // console.log('here',key1);
//         res.render('index', {
//             GREET,
//             Count,
//             Names
//         });
//     }else if(name == '' && language !== undefined) {
//         req.flash('error', 'please insert Name')
//         res.redirect('/');
//     }else if(name !== '' && language == undefined) {   req.flash('error', 'please select langauge')
//     res.redirect('/');
// }else{   req.flash('error', 'please select langauge and insert name')
// res.redirect('/');

// }
    
//     } catch (error) {
//         next(error);
//     }
// });

// app.get('/action/:person',async function(req, res, next){
// try{
//     let person = req.params.person;
   
//     let greetedPerson = await greetinst.persons(person) 
//     console.log(greetedPerson)
//     res.render('actions',{
//         greetedPerson
// })
// } catch(error){
//     next(error);
// }

// });
app.get('/action/:person',routes.greetings1)
app.get('/greeted',routes.greeted)
// app.get('/greeted', async function (req, res, next) {
//     try {
//         let Names = await greetinst.Name();
//         // console.log(greeted.rows);
//         res.render('table', {
//            result: Names
//         });
//     } catch (error) {
//         next(error);
//     }
// });

let PORT = process.env.PORT || 4001;
app.listen(PORT, function () {
    console.log('App started on port', PORT);
});