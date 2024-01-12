const express=require("express");
const connectDB=require("./config/db");
const dotenv=require("dotenv");
const {chats}=require("./data/data")
const cors = require("cors");
const path=require("path");
const PORT=process.env.PORT || 5000;
const userRoutes=require("./routes/userRoutes")
const chatRoutes=require("./routes/chatRoutes")
const messageRoutes=require("./routes/messageRoutes")
const {notFound,errorHandler}=require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app=express();
app.use(cors());

app.use(express.json());
app.use("/api/user",userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);



//  ----------------Deployement-------------
const __dirname1 =path.resolve();
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname1,'/frontend/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
    })
}
else{
    app.get("/",(req,res)=>{
        res.send("API is Running Successfully");
    })
}





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

const server=app.listen(PORT,console.log("Server started at PORT 5000"));
const io=require('socket.io')(server,{
    pingTimeout:60000, //60000ms -->it wait for 60s before it goes off-->for 60s if user doesn't send any message it will close the connection
    cors:{
        origin:"http://localhost:3000"
    }
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io");
    socket.on('setup',(userData)=>{
        socket.join(userData._id); //create room for particular user
        // console.log(userData._id)
        socket.emit("connected");

    });
    socket.on("join chat",(room)=>{
        socket.join(room);
        // console.log("User Joined Room: "+room);
    });

    socket.on('typing',(room)=>{
        socket.in(room).emit("typing");
    })

    socket.on('stop typing',(room)=>{
        socket.in(room).emit("stop typing");
    })


    socket.on("new message",(newMessageRecieved)=>{
        var chat=newMessageRecieved.chat;
        if(!chat.users){
            console.log("chat.users not defined");
        }
        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return; //agar message sender ne bheja h to vo hi recieve ni krna chahiye
            socket.in(user._id).emit("message recieved",newMessageRecieved);
        });
    })

    socket.off('setup',(userData)=>{
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
})