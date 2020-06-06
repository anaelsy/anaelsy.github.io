const express = require ('express');
const morgan = require ('morgan');
const mysql =require ('mysql');
const myConnection = require('express-myconnection');
const path =require ('path');

//Este modulo nos servirá para poder mostrar mensajes
// https://github.com/visionmedia/express-messages
var flash = require('connect-flash');

//checkou session - modulos para guardar nuestras sesiones y utilizarlas para distintos fines
//https://www.npmjs.com/package/express-session
const session = require('express-session');

//particularmente mysql session nos servira para guardar la informacion de las sesiones en una tabla dentro de nuestra bd
//https://www.npmjs.com/package/express-mysql-session
const MySQLStore = require('express-mysql-session')(session);

//La constante sessionStore será nuestra conexión para la session exclusivamente
// mismas credenciales que en la conexion que ya hicimos
const sessionStore = new MySQLStore({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'database_trend'
});

const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile); //usar archivos html usando ejs

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'database_trend'
}, 'single' ));
app.use(session({
    secret: 's3cur3',
    store: sessionStore,
    resave: false,
    saveUninitialized: false //true para empezar a guardar informacion
}));

//Para entender datos de los formularios
app.use(express.urlencoded({extended:false}));

app.use(function(req, res, next) {
    res.locals.cart = req.session.cart;
    console.log(res.locals.cart)
    next();
});
app.use(flash());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//routes (secciones del servidor)
app.use(require('./routes/routes'));

//static files
app.use(express.static(path.join(__dirname,'public')));


app.listen (app.get('port'),() => {
    console.log('server on port');
});