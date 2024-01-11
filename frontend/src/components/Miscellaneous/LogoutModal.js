import React from 'react';
import "../../css/LogoutModal.css";
import { useNavigate } from 'react-router-dom';

import { ChatState } from '../../context/ChatProvider';



const LogoutModal = () => {
  const navigate=useNavigate();
  const {logoutModal,setLogoutModal}=ChatState();

  const logout=()=>{
    localStorage.clear()
    navigate("/login")
  }

  return (
    <>
    
        <div className='LogoutModal'>
            <div className='Logout-Modal'>
                 Do you really want to Logout?
                 <div>
                    <button className='LogoutBtn' onClick={logout}>Logout</button>
                    <button className='cancelBtn' onClick={()=>{setLogoutModal(false)}}>Cancel</button>
                 </div>
                <span class="material-symbols-outlined" id="closebtn" onClick={()=>{
                        setLogoutModal(false);
                }}>close</span>
            </div>
        </div>
    
    </>
  )
}

export default LogoutModal