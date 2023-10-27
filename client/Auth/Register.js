import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Register() {
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const register = () => {
        if (firstName && lastName && jobTitle && company && email && password && confirmPassword){
            Axios.post("http://localhost:3001/register", {
                firstName,lastName,jobTitle,company,email,password,confirmPassword,
            }).then((res) => {
                setUsers((prevUsers) => [...prevUsers, res.data]);
            });
            navigate("/login");
        }
    };
    const isDisabled = () => {
        return !(firstName && lastName && jobTitle && company && email && password && confirmPassword);
    };

    return (
        <div className="container">
            <h1 className="text-center">Register</h1>
            <center className="my-5">
                <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/><br/><br/>
                <input type="text" placeholder="Job Title" onChange={(e) => setJobTitle(e.target.value)}/>
                <input type="text" placeholder="Company" onChange={(e) => setCompany(e.target.value)}/><br/><br/>
                <input type="email" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button className="btn btn-primary" onClick={register} disabled={isDisabled()}>Register</button>
            </center>
        </div>
    );
}