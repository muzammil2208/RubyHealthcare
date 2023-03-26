const db=require('./database');
function register(username,email,password)
{
    console.log(username);
    const q1=`insert into users(uid,username,email,password) values(?,?,?,?)`
    const values=[Date.now(),username,email,password]
    db.query(q1,values,(error,result,fields)=>{
        if(error)
        {
            return console.log(error);
        }
        else
        {
            return console.log(result);
            
        }
    })
}
module.exports= register;