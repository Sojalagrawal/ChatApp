const asyncHandler=require("express-async-handler");
const Chat=require("../Models/chatModel");
const User=require("../Models/userModel");




const accessChat=asyncHandler(async(req,res)=>{
    const {userId}=req.body;
    if(!userId){
        console.log("UserId param not send with request");
        return res.sendStatus(400);
    }

    var isChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}},
        ]
    }).populate("users","-password").populate("latestMessage");

    isChat=await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
    })
 
    if(isChat.length>0){
        res.send(isChat[0]);
    }
    else{
        var ChatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        };
        try{
            const createdChat=await Chat.create(ChatData);
            const FullChat=await Chat.findOne({_id:createdChat._id}).populate("users","-password");
            res.status(200).send(FullChat);
        }
        catch(err){
            res.status(400);
            throw new Error(err.message);
        }
    }


});


const fetchChats=asyncHandler(async(req,res)=>{
    try{
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results=await User.populate(results,{
                path:"latestMessage.sender",
                select:"name pic email"
            });
            res.status(200).send(results);
        });
    }
    catch(err){
        res.status(400);
        throw new Error(err.message);
    }
});

const createGroupChat=asyncHandler(async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message:"Please fill all the fields"});
    }
    var users=JSON.parse(req.body.users);
    if(users.length<2){
        return res.status(400).send("More than 2 users are required to form a group chat");
    }
    users.push(req.user);
    try{
        const groupChat=await Chat.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user,
        });
        const FullGroupChat=await Chat.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password");
        res.status(200).json(FullGroupChat);
    }
    catch(err){
        res.status(400);
        throw new Error(err.message);
    }
    
});


const renameGroup=asyncHandler(async(req,res)=>{
    const {chatId,chatName}=req.body;
    const updateChat=await Chat.findByIdAndUpdate(chatId,{
        chatName:chatName
    },{
        new:true,//it will return updated entry in updateChat variable,if we do not specify it then it will give old entry
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!updateChat){
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else{
        res.json(updateChat);
    }
});

const addToGroup=asyncHandler(async(req,res)=>{
    const {chatId,userId}=req.body;
    const added=await Chat.findByIdAndUpdate(chatId,{
        $addToSet:{users:userId}
    },{
        new:true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if(!added){
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else{
        res.json(added);
    }

});

const removeFromGroup=asyncHandler(async(req,res)=>{
    const {chatId,userId}=req.body;
    const removed=await Chat.findByIdAndUpdate(chatId,{
        $pull:{users:userId}
    },{
        new:true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if(!removed){
        res.status(404);
        throw new Error("Chat Not Found");
    }
    else{
        res.json(removed);
    }
});

const findChat=asyncHandler(async(req,res)=>{
    const {chatId}=req.body;
    try{
        const data=await Chat.findById(chatId)
        .populate("users","-password")
        .populate("groupAdmin","-password")
    
        if(!data){
            res.status(404);
            throw new Error("Chat Not Found");
        }
        else{
            res.json(data);
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
});


const deleteGroupChat=asyncHandler(async(req,res)=>{
    const {chatId}=req.body;
    try{
        const data=await Chat.findByIdAndDelete(chatId);
        
        if(!data){
            res.status(404);
            throw new Error("Chat Not Found");
        }
        else{
            res.json(data);
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports={accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup,findChat,deleteGroupChat};