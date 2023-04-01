const express= require("express")
const db=require('./routes/db-config');
const isCorrect=require('./middlewares/isCorrect')
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
 
app.get('/',(req,res,)=>{

    res.render('index');

})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',isCorrect,(req,res)=>{
    
    res.redirect('/register');
})

app.listen(port,()=>{
    console.log(`server listening at port:${port}`);
})