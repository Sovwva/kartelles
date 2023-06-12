import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Log_Form.css";
import { BaseUrlUser } from "../../config";
import { Link } from "react-router-dom";

function Log_Form() {
    const [error, setError] = useState(null);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        fetch(BaseUrlUser + "/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.accessToken) {
                    localStorage.setItem("accessToken", result.accessToken);
                    // Выполните дополнительные действия при успешном получении токена
                } else {
                    setError("Failed to receive access token");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setError("An error occurred. Please try again later.");
            });
    };

    return (
        <div className="input_form">
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Email
                    <input type="email" {...register("login", { required: true })} />
                    <div className="error">{errors?.login && <p>Error!</p>}</div>
                </label>
                <label>
                    Password
                    <input type="password" {...register("password", { required: true })} />
                    <div className="error">{errors?.password && <p>Error!</p>}</div>
                </label>
                <input type="submit" value="Login" />
            </form>
            <Link to={"/Registration"}>Register</Link>
        </div>
    );
}

export default Log_Form;
