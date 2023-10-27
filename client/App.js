import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import Admin from "./Components/Admin/Admin";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import AuthGuard from "./Auth/AuthGuard";
import Update from "./Components/Admin/Update";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header/>}> 
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/admin" element={
            <AuthGuard>
              <Admin/>
            </AuthGuard>
          }/>
          <Route path="/register" element={<Register />}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}