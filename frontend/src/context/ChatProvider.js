import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext=createContext();


const ChatProvider=({children})=>{
    const navigate=useNavigate();

    const [userarr,setUserarr]=useState([]);
    const [modalGroup,setmodalGroup]=useState(false);
    const [user,setUser]=useState();
    const [chats,setChats]=useState([]);
    const [searchspace,setSearchSpace]=useState(false);
    const [name,setName]=useState("");
    const [load,setLoad]=useState(false);
  
    useEffect(()=>{
        const userinfo=JSON.parse(localStorage.getItem("userinfo"));
        setUser(userinfo);
        if(!userinfo){
            navigate("/login");
        }
    },[]); 

    const toggleModal=()=>{
        if(modalGroup){
          setmodalGroup(false);
        }
        else{
          setmodalGroup(true);
        }
        console.log(modalGroup);
      }

      const toggleLoad=()=>{
        if(load){
          setLoad(false);
        }
        else{
          setLoad(true);
        }
      }
    
    

    return(
        <ChatContext.Provider value={{user,setUser,chats,setChats,searchspace,setSearchSpace,name,setName,modalGroup,setmodalGroup,toggleModal,userarr,setUserarr,load,setLoad,toggleLoad}}>
            {children}
        </ChatContext.Provider>
    )
};


export const ChatState=()=>{
   return useContext(ChatContext);
}


export default ChatProvider;