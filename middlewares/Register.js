const db=require('../routes/db-config')
const bcrypt=require('bcrypt')

const register=async function(req,res,next)
{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    let emailvalidation=false;
    let usernamevalidation=false
    //validating if email is already been used;
    const hashedPassword=await bcrypt.hash(password,10);
   
    //validating if email entered is not duplicate
    db.query('select email,username from users where email=?',[email],(error,result)=>{
            if(error)
            {
                res.render("register",{message:"unable to get information from database",style:"danger"})
            }
            else if(result.length>0)
            {
                res.render("register",{message:"email already used please register with different email",style:"danger"})
            }
            else
            {
               console.log("email validation successfull")
            }
    })
    
    //validating if username entered is not duplicate
     db.query('select username from users where username=?',[username],(error,result)=>{
        if(error)
        {
            res.render("register",{message:"unable to get information from database",style:"danger"})
        }
        else if(result.length>0)
        {
            res.render("register",{message:"username has already been used, please choose diffrent username",style:"danger"})
        }
        else
        {
            console.log("username validation successfull")
        }
    })
     if(emailvalidation&&usernamevalidation)
    {
        db.query(`insert into users(uid,username,email,hashedPassword) values(?,?,?,?)`,[date.now(),username,email,hashedPassword],(error,result)=>{
            if(error){
                res.render("register",{message:"faced some error while adding the user",syle:"danger"})
                console.log(error)
            }
            else
            {
                res.render("register",{message:"User added successfully",syle:"success"})
            }
        })
    }
    console.log(emailvalidation);
    console.log(usernamevalidation)
    
}

module.exports=register