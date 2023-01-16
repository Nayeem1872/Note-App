require('dotenv').config();

const express =require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB =require('./server/config/db')
// const session = require ('express-session');
const passport = require('passport');
// const MongoStore = require ('connect-mongo');
const flash = require('connect-flash');
const session = require ('express-session');


const app= express()
//passpor config
require('./server/config/passport')(passport)


const port = 5000||process.env.PORT;

// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.urlencoded({extended:true}));
app.use(express.json());



connectDB()

app.use(express.static('public'));

//bodyparser
app.use(express.urlencoded({extended:false}));

//express session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());



//connect flash
app.use(flash());


//global vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
    
})





app.use(expressLayouts);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

//route
app.use('/', require('./server/routes/index'))
app.use('/', require('./server/routes/auth'))
app.use('/', require('./server/routes/dashboard'))

app.use('/', require('./server/routes/test'))

//handle 404
app.get('*',function (req,res){
    res.status(404).render('404');
})

app.listen(port,()=>{
    console.log(`App listening ${port} `);
})