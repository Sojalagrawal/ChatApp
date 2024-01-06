import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';


export default function HomePage() {
    const navigate=useNavigate();
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("userinfo"));
        if(user){
            navigate("/chats");
        }
        else{
            navigate("/login");
        }
    },[]); 
}
