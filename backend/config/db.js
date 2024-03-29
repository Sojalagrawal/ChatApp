const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        console.log("MONGO_URI:", process.env.MONGO_URI);
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
        });
        console.log(`Mongodb connected:${conn.connection.host}`);
    }
    catch(error){
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}
module.exports=connectDB;