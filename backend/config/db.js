const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
        });
        console.log(`Mongodb connected:${conn.connection.host}`);
    }
    catch{
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}
module.exports=connectDB;