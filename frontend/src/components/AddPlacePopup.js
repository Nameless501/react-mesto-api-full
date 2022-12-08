import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.js';
import useFormStateAndValidation from '../hooks/useFormStateAndValidation.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const { values, errorMessages, formIsValid, onChange, resetFormValues } = useFormStateAndValidation();

    useEffect(() => {
        resetFormValues();
    }, [isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();
        
        onAddPlace({
            name: values.name,
            link: values.link,
        })
    }

    return(
        <PopupWithForm 
            name="add" 
            title="Новое место" 
            buttonText="Создать" 
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit} 
            isValid={formIsValid} 
        >
            <>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Название" 
                    id="place-input" 
                    className="popup__input popup__input_type_place" 
                    required 
                    minLength="2" 
                    maxLength="30" 
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
                    type="url" 
                    name="link" 
                    placeholder="Ссылка на картинку" 
                    id="link-input" 
                    className="popup__input popup__input_type_link" 
                    required 
                    onChange={onChange} 
                    value={values.link || ''} 
                />
                <span 
                    className={`popup__error-message ${
                        (!formIsValid && isOpen) ? 
                            "popup__error-message_visible" : "popup__error-message_hidden"
                        }`} 
                >
                    {errorMessages.link}
                </span>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup;