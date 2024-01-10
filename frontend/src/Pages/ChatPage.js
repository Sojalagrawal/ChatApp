import React, { useEffect,useState} from 'react';
import { ChatState } from '../context/ChatProvider';
import SideDrawer from "../components/Miscellaneous/SideDrawer";



export default function ChatPage() {
 const {user}=ChatState();
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
    </div>
  )
}
