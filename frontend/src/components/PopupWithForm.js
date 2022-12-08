import { useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingContext.js';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, isValid = true, children }) {
    const isLoading = useContext(LoadingContext);

    return(
        <section 
            className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
        >
            <form 
                name={name} 
                className="popup__form popup__form_type_form-popup" 
                onSubmit={onSubmit} 
                noValidate
            >
                <fieldset className="popup__fieldset">
                    <legend className="popup__title">
                        {title}
                    </legend>
                    {children}
                    <button 
                        type="submit" 
                        className={
                            `popup__submit-button 
                            ${name === 'delete' && 'popup__submit-button_place_delete-popup'} 
                            ${!isValid && "popup__submit-button_disabled"}`
                        } 
                        disabled={!isValid} 
                    >
                        {isLoading ? 'Сохранение...' : buttonText}
                    </button>
                </fieldset>
                <button 
                    type="reset" 
                    className="popup__close-button" 
                    onClick={onClose} 
                />
            </form>
        </section>
    );
}

export default PopupWithForm;