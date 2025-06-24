const express = require('express');  //common js model
const dotenv = require("dotenv");
const { chats } = require('./data/data');
const dbConnect = require("./config/db");
const app = express();
dbConnect();

dotenv.config();

app.use(express.json());
const port = process.env.PORT;

app.get('/about/id', (req, res) => {
  res.send('Hello This is Bishnu Kumar heyjbsjc Yadav Lolll')
})

app.get('/contact', (req, res) => {
  res.send('Hello This is contact page')
})

app.get("/chats", (req, res) => {
  res.send(chats);
})

app.get("/chats/:id", (req, res) => {
  const singleChat = chats.find((chat) => chat._id === req.params.id);
  res.send(singleChat);
})

app.use("/api/auth", require("./routes/Auth"));
app.use("/api/product", require("./routes/Products"));
app.use("/api/cart", require("./routes/Carts"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
