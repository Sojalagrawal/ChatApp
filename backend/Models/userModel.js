const mongoose=require("mongoose");
const bcrypt=require("bcrypt");


const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    pic:{type:String,default:"https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg"}
},{
    timestamps:true,
});


userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre('save',async function(next){
    if(!this.isModified){ // serSchema.pre('save', ...) registers a middleware function to be executed before the save event of the serSchema schema.The function takes a callback with a next parameter, which is a function to be called when the middleware is done. This allows the middleware to continue the execution flow.if (!this.modified) checks if the document has been modified. If it hasn't been modified, the next() function is called, and the middleware stops further execution.
        next()          //dont run the code after it
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

const User=mongoose.model("User",userSchema);
module.exports=User;
