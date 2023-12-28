import React,{useState} from 'react'
import '../../css/SignUp.css';
import {Link,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmpassword,setConfirmpassword]=useState("");
  const [pic,setPic]=useState(""); //pic saves url
  const [image,setImage]=useState("");

  





  //Toast functions
  const notifyA=(msg)=>toast.error(msg);
  const notifyB=(msg)=>toast.success(msg);
  const notifyC=(msg)=>toast.warning(msg);



  const submitHandler=()=>{
     // if(!name || !email || !password || !confirmpassword){
     //      notifyA("Please enter all the fields");
     // }  //already handled in backend
     if(password!==confirmpassword){
          notifyA("Passwords Do Not Match");
          return;
     }
     
     fetch("http://localhost:5000/api/user",{
          method:"post",
          headers:{
               "Content-Type":"application/json"
          },
          body:JSON.stringify({
               name:name,
               email:email,
               password:password,
               pic:pic?pic:undefined,

          })
     }).then(res=>res.json())
     .then(data=>{
          console.log(data);
          if(data.message){
               const s=data.message;
               notifyA(s);
          }
          else{
               notifyB("registered");
               localStorage.setItem("userinfo",JSON.stringify(data));
               navigate("/chats");
          }
     })

}

    const postDetails=()=>{
     if(image.type==="image/png" || image.type==="image/png" || image===""){
          if(image===""){
               notifyC("You have no added profile pic");
          }
          const data=new FormData();
          data.append("file",image);
          data.append("upload_preset","chatapp");
          data.append("cloud_name","sojalchat");
          fetch("https://api.cloudinary.com/v1_1/sojalchat/image/upload",{
               method:"POST",
               body:data,
          }).then(res=>res.json())
          .then(data=>{
               setPic(data.url);
               submitHandler();
          })
          .catch(err=>console.log(err));
          return;
    }
    else{
          notifyA("Error");
          return;
    }
  }

  return (
    <div className='signUp'>
      <div className='form-container'>
      <div className="form1">
            <p className='loginpara' style={{margin:"10px 60px",fontSize:"30px",fontFamily:"cursive"}}>
                TALK-A-TIVE
            </p>
      </div>
         <div className="form">
              <div>
                   <label htmlFor="name">Name:</label>
                   <input type="text" name="name" id="name" placeholder='Enter your name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
              </div>
              <div>
                   <label htmlFor="email">Email:</label>
                   <input type="email" name="email" id="email" placeholder='Enter your email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
              </div>
              <div>
                   <label htmlFor="password">Password:</label>
                   <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
              </div>
              <div>
                   <label htmlFor="confirmpassword">Confirm Password:</label>
                   <input type="password" name="confirmpassword" id="confirmpassword" placeholder='Confirm Password' value={confirmpassword} onChange={(e)=>{setConfirmpassword(e.target.value)}} />
              </div>
              <div>
                  <p>Upload Profile Pic:</p>
                  <input  type="file" id="img" name="img" accept="image/*" onChange={(e)=>{
                    setImage(e.target.files[0]);
                    
                  }}></input>
              </div>
              <p className='loginpara' style={{fontSize:"12px",margin:"10px 60px"}}>
                   By signing up,you agree to out Terms,<br /> &nbsp; &nbsp; privacy policy and cookies policy
              </p>
              <input type="submit" id="submit-btn" value="Sign Up" onClick={()=>{
                    postDetails();  
              }}/>
         </div>
         <div className="form2">
              <span id="form2span">Already have an account ?</span>
              <Link to="/login">
                 <span style={{color:"blue",cursor:"pointer"}}> SignIn</span>
              </Link>
         </div>
     </div>
</div>

  )
}



