const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build'), {maxAge: "30d"}));


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get("/shoppingList", (req, res) => {
  let response = getData();
  sendDelayedResponse(res, response, 1);
});


app.post("/shoppingItem", (req, res) => {
  let data = getData();
  let item = req.body;
  item.id = new Date().getTime();
  data.push(item);
  saveData(data);
  sendDelayedResponse(res, item, 1);
});

app.put("/shoppingItem", (req, res) => {
  let newItem = req.body;
  let data = getData();
  let index = data.findIndex(item => item.id === newItem.id);
  data.splice(index, 1, newItem);
  saveData(data);
  sendDelayedResponse(res, newItem, 1);
});

app.delete("/shoppingItem", (req, res) => {
  let newItem = req.body;
  let data = getData();
  let index = data.findIndex(item => item.id === newItem.id);
  data.splice(index, 1);
  saveData(data);
  sendDelayedResponse(res, newItem, 1);
});


function sendDelayedResponse(res, object, delay){
  setTimeout(function() {
    res.send(object);
  }, delay*1000);
}
function getData(){
  let text = fs.readFileSync('./data/data.json','utf8');
  let response = JSON.parse(text);
  return response;
}
function saveData(data){
  fs.writeFileSync(
      "./data/data.json",
      JSON.stringify(data, null, 2),
      "utf-8"
  );
}
app.listen(port, () => console.log(`Listening on port ${port}`));
