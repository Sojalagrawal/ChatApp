import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext=createContext();


const ChatProvider=({children})=>{
    const navigate=useNavigate();

    const [modalGroup,setmodalGroup]=useState(false);
    const [UpdateGroupModal,setUpdateGroupModal]=useState(false);
    const [searchspace,setSearchSpace]=useState(false);
    const [updateChatFlag,setUpdateChatFlag]=useState(false);
    const [load,setLoad]=useState(false);
    const [profileuser,setprofileuser]=useState(false);
    const [logoutModal,setLogoutModal]=useState(false);


    
    const [messages,setMessages]=useState([]);
    const [userarr,setUserarr]=useState([]);
    const [user,setUser]=useState();
    const [chats,setChats]=useState([]);
    const [chatId,setChatId]=useState("");
    const [updateuser,setUpdateuser]=useState("");
    const [chatdetail,setchatdetail]=useState();
    
    
    
  
    useEffect(()=>{
        const userinfo=JSON.parse(localStorage.getItem("userinfo"));
        setUser(userinfo);
        if(!userinfo){
            navigate("/login");
        }
    },[]); 


    const accessChatDetail=((mychat)=>{
      var name;
      if(mychat.users && mychat.users.length >= 2 && !(mychat.isGroupChat)){
          name=mychat.users[0].name===user.name?mychat.users[1].name:mychat.users[0].name;
      }
      else{
        name=mychat.chatName;
      }
      return name;
    });

    const toggleModal=()=>{
        if(modalGroup){
          setmodalGroup(false);
        }
        else{
          setmodalGroup(true);
        }
      }

      const toggleUpdateChat=()=>{
        if(updateChatFlag){
          setUpdateChatFlag(false);
        }
        else{
          setUpdateChatFlag(true);
        }
      }
      
      const toggleUpdateGroup=()=>{
        if(UpdateGroupModal){
          setUpdateGroupModal(false);
        }
        else{
          setUpdateGroupModal(true);
        }
      }

      const toggleLoad=()=>{
        if(load){
          setLoad(false);
        }
        else{
          setLoad(true);
        }
      }

      const sojal1=()=>{
        if(profileuser){
          setprofileuser(false);
        }
        else{
          setprofileuser(true);
    
        }
      }
    
    

    return(
        <ChatContext.Provider value={{user,setUser,chats,setChats,searchspace,setSearchSpace,modalGroup,setmodalGroup,toggleModal,userarr,setUserarr,load,setLoad,toggleLoad,toggleUpdateGroup,UpdateGroupModal,setUpdateGroupModal,chatId,setChatId,updateuser,setUpdateuser,updateChatFlag,setUpdateChatFlag,toggleUpdateChat,chatdetail,setchatdetail,accessChatDetail,profileuser,setprofileuser,sojal1,messages,setMessages,logoutModal,setLogoutModal}}>
            {children}
        </ChatContext.Provider>
    )
};


export const ChatState=()=>{
  return useContext(ChatContext);
}


export default ChatProvider;