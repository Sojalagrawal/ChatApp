import './App.css';
// import { Button} from '@chakra-ui/react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { ToastContainer } from 'react-toastify';
// import ChatPage from "./Pages/ChatPage";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import SideDrawer from "./components/Miscellaneous/SideDrawer";

import 'react-toastify/dist/ReactToastify.css';
import ChatProvider from './context/ChatProvider';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <ChatProvider>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/chats" element={<SideDrawer/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
            <ToastContainer theme="dark"/>
          </ChatProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
