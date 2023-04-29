const db=require('../routes/db-config')
const bcrypt=require('bcrypt')

const register=async function(req,res,next)
{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;

   
    const hashedPassword=await bcrypt.hash(password,10);
   
    //validating if email or username entered is not duplicate
    db.query(`select * from users where username=? or email=?`,[username,email],(error,result)=>{
        if(error){res.render('register',{message:"error while retriving data from database",syle:"danger"})}
        else if(result.length>0)
        {
            res.render("register",{message:"user with either same username or email address is already present",style:"danger"})
        }
        else
        {
            db.query(`insert into users(uid,username,email,password) values(?,?,?,?)`,[Date.now(),username,email,hashedPassword],(error,result)=>{
                if(error)
                {
                    res.render('register',{message:"error while adding users to the database",syle:"danger"})
                }
                else
                {
                    console.log(result)
                    res.render('register',{message:"user successfully registerd",style:"success"})
                }
            })
        }
    })
}

module.exports=register