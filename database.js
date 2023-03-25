const {createConnection}=require('mysql')

const databaseconnection=createConnection({
    host:"localhost",
    user:"root",
    password:'Mrskhan@2208',
    database:"rubyhealthcare"
})
databaseconnection.query(`select * from users`,(err,result,fields)=>{
    if(err)
    {
        return console.log(err)
    }
    return console.log(result);   
})
module.exports=databaseconnection;