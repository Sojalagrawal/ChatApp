import './App.css';
// import { Button} from '@chakra-ui/react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { ToastContainer } from 'react-toastify';
import ChatPage from "./Pages/ChatPage";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import 'react-toastify/dist/ReactToastify.css';
import ChatProvider from './context/ChatProvider';
import SideDrawer from './components/Miscellaneous/SideDrawer';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
         <ChatProvider>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/chats" element={<ChatPage/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
            <ToastContainer theme="dark"/>
          </ChatProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
