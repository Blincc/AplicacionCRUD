const express = require('express');
const handlebars = require('handlebars')
const path = require('path');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override');
const session = require ('express-session');
const flash = require ('connect-flash');

//inicializaciones
const app = express();
require('./database');

// configuraciones
 
app.set('port', process.env.PORT || 3000);//configuracion puerto del servidor local o en la nube
app.set('views', path.join(__dirname,'views'));// esta linea es para decirle a node la ruta de views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    handlebars: allowInsecurePrototypeAccess(handlebars),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//funciones que se ejecutan antes de llegar al servidor
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'cristian',
    resave: true,
    saveUninitialized: true

}));
app.use(flash());


//variables globales
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
next();
});

// rutas
//rutas para mi servidor
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//archivos estaticos

app.use(express.static(path.join(__dirname, 'public')));

//iniciar nuestro servidor
app.listen(app.get('port'),() => {
    console.log('Server on port', app.get('port'))
});
