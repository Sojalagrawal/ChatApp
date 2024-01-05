import React,{useState} from 'react';
import '../../css/SignIn.css'
import {Link} from 'react-router-dom';
// import { toast } from 'react-toastify';



export default function Login() {
  // const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

//    //Toast functions
//    const notifyA=(msg)=>toast.error(msg);
//    const notifyB=(msg)=>toast.success(msg);

  
  

  const postData=()=>{
    console.log("hi");
  }
  return (
    <div className='signIn'>
      <div className='login'>
      <div className="form1">
            <p className='loginpara' style={{margin:"10px 60px",fontSize:"30px",fontFamily:"cursive"}}>
                TALK-A-TIVE
            </p>
      </div>
        <div className="loginForm">
          <div>
            <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div>
            <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          <div>
            <input type="submit" id="login-btn" value="Sign In" onClick={()=>{postData()}}/>
          </div>
        </div>
        <div className="loginForm2">
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
