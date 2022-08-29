const express = require("express");
require("./config");
const User = require("./userSchema");
const cors = require('cors');
const PORT = 5000;
const app = express();

// Parse String Data Into JSON :
app.use(express.json());


// Cross-origin resource sharing : 
var originsWhitelist = [
  'http://localhost:4200',      // front-end url 
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
// Cross-origin resource sharing
app.use(cors(corsOptions));



// USER POST API :
app.post("/", async (req, res) => {
  let data = new User(req.body);
  let result = await data.save();
  res.send(result);
});

// USER GET API :
app.get("/", async (req, res) => {
  let data = await User.find();
  res.send(data);
});

// USER SINGLE GET API :
app.get("/:_id", async (req, res) => {
  let data = await User.findById(req.params);
  res.send(data);
});

// USER UPDATE API :
app.put("/edit/:_id", async(req, res) => {
  let data = await User.updateOne(req.params, {
    $set: req.body,
  });
  res.send(data);
});

// USER DELETE API :
app.delete('/:_id', async(req,res) => {
    let data = await User.deleteOne(req.params);
    res.send(data);
});

app.listen(PORT, () => {
  console.log(`Server Started At http://localost:${PORT}`);
});
