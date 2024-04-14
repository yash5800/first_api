const express = require('express');
const cors = require('cors');
const { message } = require('statuses');
const app = express();

const port = process.env.PORT || 8080;

app.use(cors());

data = {};

app.get('/',(req,res)=>{
  const data = {suguna:"king of cures"} ;
  res.json(data);
})

app.listen(port,()=>{
  console.log(`server running on ${port}`)
})