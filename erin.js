const express = require('express'); 
const cors = require('cors');
const app = express();

const port = process.env.PORT || 8080;

app.use(cors());

var data = {1:"hi",2:"hello"}

app.get('/make_wet/:make/:wet', (req, res) => {
    console.log("entered into auto saver");
    const key = decodeURIComponent(req.params.make);
    const val = decodeURIComponent(req.params.wet);
    data[key] = val;
    console.log(data);
    console.log("updated to dictionay!!");
    res.json({key:"done"});
    return;
});

app.get('/fuck/:id', (req, res) => {
    console.log("entered");
    const id = parseInt(req.params.id);
    console.log(id);
    for (let i in data) {
        if (parseInt(i) === id) {
            console.log(i);
            res.json({ key: data[i] });
            return ;
        }
    }
    res.json({ key: "" });
});


app.listen(port, () => console.log(`Server running on ${port}`));
