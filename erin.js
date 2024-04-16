const express = require('express'); 
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const port = process.env.PORT || 8080;

const db = new sqlite3.Database('./wets.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the database.");
    }
});

app.use(cors());

db.run('create table if not exists moko(key text primary key,value text)');



app.get('/make_wet/:make/:wet', (req, res) => {
    console.log("entered into saver");
    const key = decodeURIComponent(req.params.make);
    const val = decodeURIComponent(req.params.wet);
    console.log(key);
    console.log(val);
    db.run(`update moko set value like ? where key like ?`,[val,key],(err)=>{
        if(err){
            res.json({key:"Somthing went wrong"});
            console.log("not inserted")

        }
        else{
            console.log("updated in database!!");
            res.json({key:"Saved"});
        }
    });
    
});

app.get('/fuck/:id', (req, res) => {
    console.log("entered");
    const key = req.params.id;
    console.log(key);
    var data = '';
    //check if exists in database and return val
    db.get(`SELECT * FROM moko WHERE key = ?`, [key],(err,row)=>{
        if(err){
         console.log("somthing wroug");
         res.json({ key: "Failed" });
        }
        else{
         if(row){
           console.log("Data : ",row);
           res.json({ key: row.value });
           return ;
         }else{
            db.run(`insert into moko values(?,'')`,[key],(err)=>{
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
