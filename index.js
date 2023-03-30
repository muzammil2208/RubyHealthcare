const express= require("express")
const db=require('./routes/db-config');
const app=express();
const dotenv=require("dotenv").config();
const port=process.env.PORT||3000
const cookie=require('cookie-parser');

//SETTING 
app.set('view engine','ejs');
app.set('views','./views');

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.use(express.static(__dirname + '/public'));
 
app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',(req,res)=>{
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);
    res.redirect('/register');
})

app.listen(port,()=>{
    console.log(`server listening at port:${port}`);
})