import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Reg_Form.css"; // Подключаем CSS файл
import { BaseUrlUser } from "../../config";

function Reg_Form() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [error, setError] = useState(null);

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        console.log(data);
        fetch(BaseUrlUser + "/api/user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.ok) {
                    // Действия при успешной регистрации
                } else {
                    setError(result.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setError("An error occurred. Please try again later.");
            });
    };

    return (
        <div className="input_form">
            <h2>Registration</h2>
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
                <label>
                    First name
                    <input type="text" {...register("firstName", { required: true })} />
                    <div className="error">{errors?.firstname && <p>Error!</p>}</div>
                </label>
                <label>
                    Last Name
                    <input type="text" {...register("lastName", { required: true })} />
                    <div className="error">{errors?.lastname && <p>Error!</p>}</div>
                </label>
                <input type="submit" />
            </form>
        </div>
    );
}

export default Reg_Form;
