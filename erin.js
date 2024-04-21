const express = require('express'); 
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const port = process.env.PORT || 8080;


const connection = mysql.createConnection({
    host: 'bx9q0wtcxb0065zsduco-mysql.services.clever-cloud.com',
    user: 'ucxrx4v9si7xd8j7',
    password: 'WqsTTpzcrp7jDik9ORTI',
    database: 'bx9q0wtcxb0065zsduco'
});

connection.connect((err)=>{
    if(err){
        console.error("connection failed")
    }
    else{
        console.log("Connected to database!!")
    }
});

app.use(cors());

connection.query('create table if not exists moko(user text,value text)',(err,result)=>{
    if(err){
        console.error('error in creation');
        return;
    }
        console.log("created!");
});


app.get('/make_wet/:make', (req, res) => {
    console.log("entered into saver");
    const data = JSON.parse(req.params.make);
    console.log(data);
    connection.query(`update moko set value = ? where user = ?`,[data.val,data.key],(err,result)=>{
       if(err){
         res.json({key : "not saved"});
         console.error("not updated");
         return
       }
       console.log("Database say : ",result);
       res.json({key : "saved"});
       
    });
});


app.get('/wipe/:dead', (req, res) => {
    console.log("entered into deletion");
    const data = req.params.dead;
    console.log(data);
    connection.query(`delete from moko where user = ?`,[data],(err,result)=>{
       if(err){
         res.json({key : "not deleted"});
         console.error("not Deleted");
         return;
       }
       console.log("Database say : ",result);
       res.json({key : "Deleted"});
       return;
    });
});


app.get('/fuck/:id', (req, res) => {
    console.log("entered");
    const key = req.params.id;
    console.log(key);
    var data = '';
    connection.query(`SELECT * FROM moko WHERE user = ?`, [key],(err,rows)=>{
        if(err){
         console.log("somthing wroug");
         res.json({ key: "Failed" });
        }
        else{
            if (rows.length > 0) {
                console.log("Data:", rows);
                res.json({ key: rows[0].value });
            }else{
            connection.query(`insert into moko values(?,'')`,[key],(err,result)=>{
                if(err){
                    console.log("not inserted")
                    res.json({ key: "Failed to create" });
                }
                else{
                    console.log("Inserted new key into database");
                    res.json({ key: "created !!" });
                }
            }); 
             
         }
        }
     });  
    //check if exists not in database create key
    
});


app.listen(port, () => console.log(`Server running on ${port}`));
