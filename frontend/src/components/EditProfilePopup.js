import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import useFormStateAndValidation from '../hooks/useFormStateAndValidation.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const { values, errorMessages, formIsValid, onChange, resetFormValues } = useFormStateAndValidation();

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    useEffect(() => {
        const data = {
            name: currentUser.data.name,
            about: currentUser.data.about,
        }

        resetFormValues(data, {}, true);
    },
    [currentUser, isOpen])

    return(
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль" 
            buttonText="Сохранить" 
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit} 
            isValid={formIsValid} 
        >
            <>
                <input 
                    type="text" 
                    name="name" 
                    id="name-input" 
                    className="popup__input popup__input_type_name" 
                    required 
                    minLength="2" 
                    maxLength="40" 
                    onChange={onChange} 
                    value={values.name || ''} 
                />
                <span 
                    className={`popup__error-message ${
                        (!formIsValid && isOpen) ? 
                            "popup__error-message_visible" : "popup__error-message_hidden"
                    }`} 
                >
                    {errorMessages.name}
                </span>
                <input 
                    type="text" 
                    name="about" 
                    id="job-input" 
                    className="popup__input popup__input_type_job" 
                    required 
                    minLength="2" 
                    maxLength="200" 
                    onChange={onChange} 
                    value={values.about || ''} 
                />
                <span 
                    className={`popup__error-message ${
                        (!formIsValid && isOpen) ? 
                            "popup__error-message_visible" : "popup__error-message_hidden"
                    }`} 
                >
                    {errorMessages.about}
                </span>
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup;