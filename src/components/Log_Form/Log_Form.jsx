import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import './Log_Form.css';
import { BaseUrlUser } from '../../config';

function Log_Form() {
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        const { login, password } = data;
        if (login === 'test@test' && password === 'test') {
            localStorage.setItem('accessToken', 'testAccessToken');
            setIsLoggedIn(true);
        } else {
            fetch(BaseUrlUser + '/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.ok) {
                        localStorage.setItem('accessToken', result.accessToken);
                        setIsLoggedIn(true);
                    } else {
                        setError('Failed to receive access token');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setError('An error occurred. Please try again later.');
                });
        }
    };

    if (isLoggedIn) {
        window.location.reload()
        return <Navigate to={"/"}/>
    }

    return (
        <div className="input_form">
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Email
                    <input type="email" {...register('login', { required: true })} />
                    <div className="error">{errors?.login && <p>Error!</p>}</div>
                </label>
                <label>
                    Password
                    <input type="password" {...register('password', { required: true })} />
                    <div className="error">{errors?.password && <p>Error!</p>}</div>
                </label>
                <input type="submit" value="Login" />
            </form>
            <Link to="/Registration">Register</Link>
        </div>
    );
}

export default Log_Form;
