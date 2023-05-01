
//initializing 
const express= require("express")
const db=require('./routes/db-config');
const register=require('./middlewares/Register')
const app=express();
const dotenv=require("dotenv").config();
const port=process.env.PORT||3000
const cookie=require('cookie-parser');
const {loggedIn} =require('./middlewares/login')
const session=require('express-session');
const mysqlStore=require('express-mysql-session')(session);
const passport=require('passport')
const LocalStrategy=require('passport-local')
const bcrypt=require('bcrypt')

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
app.use(passport.initialize())
app.use(passport.session())

//setting up passport js
const customerFields={
    usernameField:'username',
    passwordField:'password'
}
const verifyCallback=(username,password,done)=>{
    
    db.query(`select * from users where username=?`,[username],async(error,result)=>{
        if(error){return done(error)}
        if(await bcrypt.compare(pass,result[0].password))
        {
            return done(null,result)
        }
        else
        {
            return done(null,false)
        }
            

    })
}
 const strategy=new LocalStrategy(customerFields,verifyCallback)
 passport.use(strategy)
passport.serializeUser((result,done)=>{
    console.log("inside serialize")
    done(null,result[0].uid)
})
passport.deserializeUser((result,done)=>{
    console.log("inside deserialize")
    db.query(`select * from users where uid=?`,[result],(error,result)=>{return done(null,result[0])})
})




//routes
app.get('/',(req,res,)=>{
    res.render('index');
})

app.get('/login',loggedIn,(req,res)=>{
    res.render('login',{message:"please enter your credentials",style:"dark"})
})
app.post('/login',passport.authenticate('local',{failureRedirect:'/login',successRedirect:'/'}));

app.get('/register',(req,res)=>{
    res.render('register',{message:"please enter your details",style:"dark"})
})

app.post('/register',register)


app.listen(port,()=>{
    console.log(`server listening at port:${port}`);
})