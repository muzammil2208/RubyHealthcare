const db=require('../routes/db-config')
const bcrypt =require('bcrypt')

     
 // compare password
    
const loginValidation=async function(req,res,next)
{
    let username=req.body.username;
    let password=req.body.password;
    
    
    db.query(`select * from users where username=?`,[username],async(error,result)=>{
        if(error){res.render('login',{message:"not able to retrieve information for validation",style:"danger"})}
        if(await bcrypt.compare(password,result[0].password))
        {
            res.render('login',{message:"user successfully validated",style:"success"})
        }
        else
        {
            res.render('login',{message:"wrong password entered",style:"danger"})
        }
            

    })
    
}
module.exports=loginValidation