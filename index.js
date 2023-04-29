const express= require("express")
const db=require('./routes/db-config');
const register=require('./middlewares/Register')
const app=express();
const dotenv=require("dotenv").config();
const port=process.env.PORT||3000
const cookie=require('cookie-parser');
const loginValidation=require('./middlewares/login')
const session=require('express-session');
const mysqlStore=require('express-mysql-session')(session);
const options ={
    connectionLimit: 10,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    createDatabaseTable: true
    
}
const  sessionStore = new mysqlStore(options);
//SETTING 
app.set('view engine','ejs');
app.set('views','./views');

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.use(express.static(__dirname + '/public'));
app.use(session({
    name: 'login_session',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    secret: 'Mrskhan',
    cookie: {
        maxAge: 1000*60*60*24,
        
    }
}))
//routes
app.get('/',(req,res,)=>{
    if(req.session.viewCount)
    {
        req.session.viewCount=req.session.viewCount+1;
    }
    else
    {
        req.session.viewCount=1;
    }
    console.log(req.session.viewCount)
    res.render('index');

})

app.get('/login',(req,res)=>{
    res.render('login',{message:"please enter your credentials",style:"dark"})
})
app.post('/login',loginValidation);

app.get('/register',(req,res)=>{
    res.render('register',{message:"please enter your details",style:"dark"})
})

app.post('/register',register)


app.listen(port,()=>{
    console.log(`server listening at port:${port}`);
})