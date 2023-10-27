import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/updateUser/${id}`);
      const { firstName, lastName, jobTitle, company, email } = data;
      setFirstName(firstName);
      setLastName(lastName);
      setJobTitle(jobTitle);
      setCompany(company);
      setEmail(email);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("jobTitle", jobTitle);
    formData.append("company", company);
    formData.append("email", email);
    if (password) {
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
    }
    try {
      const { data } = await axios.put(`http://127.0.0.1:8000/updateUser/${id}`, formData);
      console.log(data.message);
      navigate("/");
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <form className="container" onSubmit={updateUser}>
      <input
        type="text"
        name="firstName"
        value={firstName}
        className="my-3"
        required
        placeholder="First Name"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        name="lastName"
        value={lastName}
        className="my-3"
        required
        placeholder="Last Name"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        name="jobTitle"
        value={jobTitle}
        className="my-3"
        required
        placeholder="Job Title"
        onChange={(e) => {
          setJobTitle(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        name="company"
        value={company}
        className="my-3"
        required
        placeholder="Company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      <br />
      <input
        type="email"
        name="email"
        value={email}
        className="my-3"
        required
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        value={password}
        className="my-3"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}/>
        <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            className="my-3"
            placeholder="confirm Password"
            onChange={(e) => {
            setConfirmPassword(e.target.value);
        }}/>
            <button type="submit" className="btn btn-secondary mx-3">Update</button>               
        </form>   
    )   
}