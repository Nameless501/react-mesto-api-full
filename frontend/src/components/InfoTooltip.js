import React from 'react';
import { useHistory } from 'react-router-dom';

function InfoTooltip({ isOpen, isSuccess, onClose }) {
    const history = useHistory();

    function handleClose() {
        if(isSuccess) {
            onClose();
            history.push('/sign-in');
        } else {
            onClose();
        }
    }

    return(
        <section className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__form popup__form_type_result" >
                <div 
                    className={`popup__result-img ${
                        isSuccess ? 
                            "popup__result-img_type_success" : "popup__result-img_type_fail"
                    }`} 
                />
                <p className="popup__result-caption">
                    {isSuccess ? 
                        "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."
                    }
                </p>
                <button 
                    type="reset" 
                    className="popup__close-button" 
                    onClick={handleClose}
                />
            </div>
        </section>
    )
}

export default InfoTooltip;