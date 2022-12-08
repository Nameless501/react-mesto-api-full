import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import useFormStateAndValidation from '../hooks/useFormStateAndValidation.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const { values, errorMessages, formIsValid, onChange, resetFormValues } = useFormStateAndValidation();

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: values.avatar
        });
    }

    useEffect(() =>{
        resetFormValues();
    }, [isOpen])

    return(
        <PopupWithForm 
            name="avatar" 
            title="Обновить аватар" 
            buttonText="Сохранить" 
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit} 
            isValid={formIsValid} 
        >
            <>
                <input 
                    type="url" 
                    name="avatar" 
                    placeholder="Ссылка на картинку" 
                    id="avatar-input" 
                    className="popup__input popup__input_type_link" 
                    required 
                    onChange={onChange} 
                    value={values.avatar || ''}
                />
                <span 
                className={`popup__error-message ${
                    (!formIsValid && isOpen) ? 
                        "popup__error-message_visible" : "popup__error-message_hidden"
                    }`} 
                >
                    {errorMessages.avatar}
                </span>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;