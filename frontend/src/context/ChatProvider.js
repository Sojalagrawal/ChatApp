import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext=createContext();


const ChatProvider=({children})=>{
    const navigate=useNavigate();
    const [user,setUser]=useState();
    const [chats,setChats]=useState([]);
    const [searchspace,setSearchSpace]=useState(false);
    const [name,setName]=useState("");


    
    useEffect(()=>{
        const userinfo=JSON.parse(localStorage.getItem("userinfo"));
        setUser(userinfo);
        if(!userinfo){
            navigate("/login");
        }
    },[]); 

    return(
        <ChatContext.Provider value={{user,setUser,chats,setChats,searchspace,setSearchSpace,name,setName}}>
            {children}
        </ChatContext.Provider>
    )
};


export const ChatState=()=>{
   return useContext(ChatContext);
}


export default ChatProvider;