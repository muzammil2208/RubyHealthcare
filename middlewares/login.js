const db=require('../routes/db-config')
const bcrypt =require('bcrypt')

const loginValidation=async function(req,res,next)
{
    let username=req.body.username;
    let password=req.body.password;
    let hashedpassword=await bcrypt.hash(password,10)
    db.query(`select * from users where username=?`,[username],(error,result)=>{
        if(error){res.render('login',{message:"not able to retrieve information for validation",style:"danger"})}
        if(result[0].password===hashedpassword)
        {
            console.log("user login successfully");
        }
        else
        {
            res.render('login',{message:"passsword entered is incorrect",style:"danger"})
        }
    })
    
}
module.exports=loginValidation