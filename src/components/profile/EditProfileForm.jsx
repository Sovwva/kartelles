import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function EditProfileForm() {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const getToken = () => {
        return localStorage.getItem('accessToken');
    };

    const handleEditProfileSubmit = async (data) => {
        if (Object.keys(errors).length > 0) {
            // Если есть ошибки валидации, отказываем в обновлении
            console.log('Validation error. Please fill in all fields.');
            return;
        }

        try {
            const token = getToken();
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // Отправка запроса на сервер с обновленными данными профиля
            const response = await axios.put('/api/user', data, config);
            console.log(response.data); // Обработка успешного обновления профиля

            // Дополнительные действия после успешного обновления профиля
            // Например, обновление состояния компонента или отображение сообщения об успешном обновлении
        } catch (error) {
            console.error(error); // Обработка ошибок при редактировании профиля
            // Дополнительные действия при возникновении ошибки, например, отображение сообщения об ошибке
        }
    };

    const handleDeleteProfile = () => {
        setIsDeleting(true);
    };

    const handleDeleteConfirmation = () => {
        setDeleteConfirmation(true);
    };

    const handleDeleteCancel = () => {
        setIsDeleting(false);
        setDeleteConfirmation(false);
    };

    const handleDeleteUser = () => {
        const token = getToken();
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.delete('/api/user', config)
            .then(response => {
                console.log(response.data); // Обработка успешного удаления пользователя
            })
            .catch(error => {
                console.error(error); // Обработка ошибок
            });
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <form className="input_form" onSubmit={handleSubmit(handleEditProfileSubmit)}>
                <label>
                    First Name:
                    <input type="text" {...register('firstName', { required: true })} />
                    {errors.firstName && <p className="error-message">First Name is required</p>}
                </label>
                <label>
                    Last Name:
                    <input type="text" {...register('lastName', { required: true })} />
                    {errors.lastName && <p className="error-message">Last Name is required</p>}
                </label>
                <button type="submit">Update</button>
            </form>

            {!isDeleting ? (
                <button className="delete-button" onClick={handleDeleteProfile}>
                    Delete Profile
                </button>
            ) : (
                <div>
                    {!deleteConfirmation ? (
                        <div>
                            <p>Are you sure you want to delete your profile?</p>
                            <button onClick={handleDeleteConfirmation}>Yes</button>
                            <button onClick={handleDeleteCancel}>No</button>
                        </div>
                    ) : (
                        <div>
                            <p>Deleting your profile...</p>
                            <button onClick={handleDeleteUser}>Confirm Deletion</button>
                            <button onClick={handleDeleteCancel}>Cancel</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default EditProfileForm;
