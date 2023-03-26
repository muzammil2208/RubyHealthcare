const express = require('express')
const app=express();
const path=require('path')
const db=require('./database.js')
const register=require('./register');
const port=3000
const flash=require('connect-flash')
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
//routing


app.get('/', (req, res) => {
  res.render('index');
})
app.get('/login',(req,res)=>{
  res.render('login');
})
app.get('/register',(req,res)=>{
  res.render('register')
})
app.get('*',(req,res)=>{
  res.send("This path is no specified")
})
// post methods
app.post("/register",(req,res)=>{
  const username=req.body.username;
  const password=req.body.password;
  const email=req.body.email;
  console.log(username+" with email:"+email+" has registered");
  register(username,email,password);

})
app.listen(port,() => {
    console.log(`port listening at port number:&${port}`);
})
