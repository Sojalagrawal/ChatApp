import React,{useState} from 'react'
import '../../css/SignUp.css';
import {Link,useNavigate} from 'react-router-dom';
// import { toast } from 'react-toastify';

export default function SignUp() {
  // const navigate=useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmpassword,setConfirmpassword]=useState("");


  //Toast functions
  // const notifyA=(msg)=>toast.error(msg);
  // const notifyB=(msg)=>toast.success(msg);

  const postData=()=>{
    console.log("hi");
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
                   <label for="name">Name:</label>
                   <input type="text" name="name" id="name" placeholder='Enter your name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
              </div>
              <div>
                   <label for="email">Email:</label>
                   <input type="email" name="email" id="email" placeholder='Enter your email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
              </div>
              <div>
                   <label for="password">Password:</label>
                   <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
              </div>
              <div>
                   <label for="confirmpassword">Confirm Password:</label>
                   <input type="password" name="confirmpassword" id="confirmpassword" placeholder='Confirm Password' value={confirmpassword} onChange={(e)=>{setConfirmpassword(e.target.value)}} />
              </div>
              <div>
                  <p>Upload Profile Pic:</p>
                  <input  type="file" id="img" name="img" accept="image/*"></input>
              </div>
              <p className='loginpara' style={{fontSize:"12px",margin:"10px 20px",margin:"10px 60px"}}>
                   By signing up,you agree to out Terms,<br /> &nbsp; &nbsp; privacy policy and cookies policy
              </p>
              <input type="submit" id="submit-btn" value="Sign Up" onClick={()=>{
                   postData()
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
