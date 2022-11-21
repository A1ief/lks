import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>} />
            <Route path="/home" element={<Home/>} />
         </Routes>
      </div>
   );
}

export default App;
