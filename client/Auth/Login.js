import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {AccountService} from './AccountService'
import axios from 'axios';

export default function Login() {
    let navigate = useNavigate()

    const [credentials, setCredentials] = useState([])
    
    // Gestion de la modification des champs du formulaire
    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(credentials)
        axios.post('http://localhost:3001/login', credentials)
            .then(res => {
                console.log(res)
                AccountService.saveToken(res.data.token)
                navigate('/admin')
            })
            .catch(error => console.log(error))
    }
    
    return (
        <form className='container my-3' onSubmit={onSubmit}>
            <div className="group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email"  value={credentials.email} onChange={onChange}/>
                <label htmlFor="password">password</label>
                <input type="password" name="password" value={credentials.password} onChange={onChange}/>
                <button>Connexion</button>
            </div>
        </form>
    );
};