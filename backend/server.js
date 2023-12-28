const express=require("express");
const dotenv=require("dotenv");
const {chats}=require("./data/data")
const cors = require("cors");
const PORT=process.env.PORT || 5000;
const connectDB=require("./config/db");
const userRoutes=require("./routes/userRoutes")
const {notFound,errorHandler}=require("./middleware/errorMiddleware");

dotenv.config();
const app=express();
app.use(cors());
connectDB();

app.use(express.json());
app.use("/api/user",userRoutes);



app.get('/chats',(req,res)=>{
    res.send("API is ruuning");
})

app.get('/api/chat',(req,res)=>{
    res.send(chats);
})

app.get('/api/chat/:id',(req,res)=>{
    const singleChat=chats.find((c)=>c._id===req.params.id);
    res.send(singleChat);
})


//if all above url doesnt exist then it fall into these middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT,console.log("Server started at PORT 5000"));