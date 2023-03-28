const express= require("express")
const db=require('./routes/db-config');
const app=express();
const dotenv=require("dotenv").config();
const port=process.env.PORT||3000
const cookie=require('cookie-parser');

//SETTING 
app.set('view engine','ejs');
app.set('views','./views');
app.use('/js',express.static(__dirname+'./public/js'))
app.use('/css',express.static(__dirname+'./public/css'))




app.listen(port,()=>{
    console.log(`server listening at port:${port}`);
})