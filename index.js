const express= require("express")
const db=require('./routes/db-config');
const register=require('./middlewares/Register')
const app=express();
const dotenv=require("dotenv").config();
const port=process.env.PORT||3000
const cookie=require('cookie-parser');
const loginValidation=require('./middlewares/login')
//SETTING 
app.set('view engine','ejs');
app.set('views','./views');

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.use(express.static(__dirname + '/public'));
 

//routes
app.get('/',(req,res,)=>{

    res.render('index');

})

app.get('/login',(req,res)=>{
    res.render('login',{message:"please enter your credentials",style:"dark"})
})
app.post('/login',loginValidation,(req,res)=>{
    res.redirect('/login')
})
app.get('/register',(req,res)=>{
    res.render('register',{message:"please enter your details",style:"dark"})
})

app.post('/register',register,(req,res)=>{
    res.redirect('/register');
})

app.listen(port,()=>{
    console.log(`server listening at port:${port}`);
})