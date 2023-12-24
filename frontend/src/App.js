import './App.css';
// import { Button} from '@chakra-ui/react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
// import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";



function App() {
  return (
    <BrowserRouter>
     <div className="App">
        <Routes>
            {/* <Route path="/" element={<HomePage/>}/> */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/chats" element={<ChatPage/>}/>
            <Route path="/" element={<SignUp/>}/>
        </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App;
