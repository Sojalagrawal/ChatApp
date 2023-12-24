const express=require("express");
const dotenv=require("dotenv");
const {chats}=require("./data/data")
const cors = require("cors");
const PORT=process.env.PORT || 5000;
const connectDB=require("./config/db");

dotenv.config();
const app=express();
app.use(cors());
connectDB();

app.get('/',(req,res)=>{
    res.send("API is ruuning");
})


app.get('/api/chat',(req,res)=>{
    res.send(chats);
})

app.get('/api/chat/:id',(req,res)=>{
    const singleChat=chats.find((c)=>c._id===req.params.id);
    res.send(singleChat);
})

app.listen(PORT,console.log("Server started at PORT 5000"));