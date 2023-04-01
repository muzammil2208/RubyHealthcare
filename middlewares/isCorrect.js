const db=require('../routes/db-config')
const bcrypt=require('bcrypt')


async function isCorrect(req,res,next)
{
    try{
        const username=req.body.username;
        const password=req.body.password;
        const email=req.body.email;
        const salt=  await bcrypt.genSalt();
        const hashpassword= await bcrypt.hash(password,salt);
        let values=[Date.now(),username,email,hashpassword]
        let query=`insert into users(uid,username,email,password) values(?,?,?,?)`
        db.query(query,values,(error,result)=>{
            
            if(error){console.log(error)}
            else{
                console.log("new user is registered");
            }
        })
}catch{
    console.log(res.send("Something went wrong while adding the user"))
}
    next();
}

module.exports=isCorrect;