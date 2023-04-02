const db=require('../routes/db-config')
const bcrypt=require('bcrypt')

const register=async function(req,res,next)
{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    //validating if email is already been used;
    const hashedpassword=await bcrypt.hash(password,10);
    db.query('select email,username from users where email=?',[email],(error,result)=>{
            if(error)
            {
                res.render("register",{message:"unable to get information from database",style:"danger"})
            }
            if(result.length>0)
            {
                res.render("register",{message:"email already used please register with different email",style:"danger"})
            }
            else
            {
                db.query(`insert into users(uid,username,email,password) values(?,?,?,?)`,[Date.now(),username,email,hashedpassword],(error,result)=>{
                    if(error)
                    {
                        res.render("register",{message:"error while adding user to database",style:"danger"});
                        console.log(error);
                    }
                    else
                    {
                        res.render("register",{message:"user added successfully",style:"success"})
                        
                    }
                })
            }
    })
}

module.exports=register