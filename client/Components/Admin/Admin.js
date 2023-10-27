import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AccountService } from '../../Auth/AccountService';
import axios from 'axios';

export default function Admin() {
  const [data, setData] = useState([]);
  let navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const deleteUser = (_id) => {
    axios.delete(`http://localhost:3001/deleteUser/${_id}`)
      .then(res => {
        console.log(res.data);
        // success response
        setData((prevUsers) =>
          prevUsers.filter((user) => user._id !== _id)
        );
      })
      .catch(err => {
        console.error(err);
        // error response
      });
  };

 
  const logout = () => {
    AccountService.logout()
    navigate('/login')
  }

  return (
    <div>
        <center>
            <h1>Admin</h1>
        </center>
        {data.map(item => (
            <ul type="none" key={item.id}>
                <li><b>User Name : </b>{item.firstName}</li>
                <li><b>Email : </b>{item.email}
                  <Link className="btn btn-secondary rounded-pill mx-2" to={`/update/${item._id}`}>Update</Link>                  
                  <button className="btn btn-danger rounded-pill mx-1" onClick={() => deleteUser(item._id)}>Delete</button><hr/>                
                </li>
            </ul>
        ))}
        <Link to="/register">
          <button className='btn btn-success mx-3'>Create User</button>
        </Link>
        <button className='btn btn-warning mx-2' onClick={logout}>Logout</button>
    </div>
  );
}