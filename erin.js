// const express = require('express'); 
// const cors = require('cors');
// const sqlite3 = require('sqlite3').verbose();
// const app = express();

// const port = process.env.PORT || 8080;

// let db = new sqlite3.Database('./wets.db',(err)=>{
//     if(err){
//         console.log("no such file");
//     }
// });

// app.use(cors());

// db.run('create table if not exists moko(key text primary key,value text)');



// app.get('/make_wet/:make/:wet', (req, res) => {
//     console.log("entered into auto saver");
//     const key = decodeURIComponent(req.params.make);
//     const val = decodeURIComponent(req.params.wet);
//     db.run(`update moko set value = ? where key = ?`,[key,val],(err)=>{
//         if(err){
//             console.log("not inserted")
//         }
//     });
//     console.log("updated in database!!");
//     res.json({key:"done"});
//     return;
// });

// app.get('/fuck/:id', (req, res) => {
//     console.log("entered");
//     const key = req.params.id;
//     console.log(key);
//     var data = '';
//     //check if exists in database and return val
//     db.all(`SELECT * FROM moko WHERE key = ?`, [key],(err,row)=>{
//         if(err){
//          console.log("somthing wroug");
//          res.json({ key: "" });
//         }
//         else{
//          if(row){
//            console.log("Data : ",row);
//            res.json({ key: row.value });
//            return ;
//          }else{
//             db.run(`insert into moko values(?,'')`,[key],(err)=>{
//                 if(err){
//                     console.log("not inserted")
//                     res.json({ key: "" });
//                 }
//                 else{
//                     console.log("Inserted new key into database");
//                     res.json({ key: "" });
//                 }
//             }); 
             
//          }
//         }
//      });  
//     //check if exists not in database create key
    
// });


// app.listen(port, () => console.log(`Server running on ${port}`));

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

const port = process.env.PORT || 8080;

let db = new sqlite3.Database('./wets.db', err => {
    if (err) {
        console.log("No such file");
    }
});

app.use(cors());

db.run('CREATE TABLE IF NOT EXISTS moko(key TEXT PRIMARY KEY, value TEXT)');

db.run("INSERT OR IGNORE INTO moko VALUES('gojo', 'i am king')", err => {
    if (err) {
        console.log("Not inserted");
    }
});

app.get('/make_wet/:make/:wet', (req, res) => {
    console.log("Entered into auto saver");
    const key = decodeURIComponent(req.params.make);
    const val = decodeURIComponent(req.params.wet);
    db.run(`UPDATE moko SET value = ? WHERE key = ?`, [val, key], err => {
        if (err) {
            console.log("Not updated");
        } else {
            console.log("Updated in database!!");
            res.json({ key: "done" });
        }
    });
});

app.get('/fuck/:id', (req, res) => {
    console.log("Entered");
    const key = req.params.id;
    console.log(key);
    // Check if key exists in database
    db.get(`SELECT * FROM moko WHERE key = ?`, [key], (err, row) => {
        if (err) {
            console.log("Something wrong");
            res.json({ key: "" });
        } else {
            if (row) {
                console.log("Data: ", row);
                res.json({ key: row.value });
            } else {
                // If key doesn't exist in database, insert it with empty value
                db.run(`INSERT INTO moko VALUES(?, '')`, [key], err => {
                    if (err) {
                        console.log("Not inserted");
                        res.json({ key: "" });
                    } else {
                        console.log("Inserted new key into database");
                        res.json({ key: "" });
                    }
                });
            }
        }
    });
});

app.listen(port, () => console.log(`Server running on ${port}`));

