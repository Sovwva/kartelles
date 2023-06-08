import React from "react";
import { useForm } from "react-hook-form";

// Отправка данных через API
const onSubmit = (data) => {
    console.log(data);
fetch("/api/user/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
})
    .then((response) => response.json())
    .then((result) => {
        // Обработка ответа
        console.log(result);
    })
    .catch((error) => {
        console.error("Ошибка:", error);
    });
};

function Log_Form({ form_type }) {
    const { register,
        formState: { errors },
        handleSubmit,
        watch
        } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }

    // const password = watch("password");
    // const email = watch("email");



    return (
        <div className="input_form">
            <h2>{form_type}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Email
                    <input type={"email"} {...register("email", { required: true,})}/>
                    <div style={{ height: 40}}>{errors?.email && <p>Error!</p>}</div>
                </label>
                <label>
                    Password
                    <input type={"password"} {...register('password',{ required: true,})}/>
                </label>
                <label>
                    First name
                    <input type={"text"} {...register('First Name',{ required: true,})}/>
                </label>
                <label>
                    Last Name
                    <input type={"text"} {...register('Last Name',{ required: true,})}/>
                </label>
                <input type={"submit"}/>

            </form>
        </div>
    );
}

export default Log_Form;