import { useEffect } from "react";
import useFormStateAndValidation from '../hooks/useFormStateAndValidation.js';

function AuthForm({ name, handleSubmit }) {
    const { values, errorMessages, formIsValid, onChange, resetFormValues } = useFormStateAndValidation();

    useEffect(() => {
        resetFormValues();
    },
    [])

    function onSubmit(evt) {
        evt.preventDefault();

        handleSubmit(values.password, values.email);
    }

    return(
        <form 
            name={name} 
            className="sign__form" 
            onSubmit={onSubmit} 
            noValidate
        >
        <fieldset className="sign__fieldset">
            <legend className="sign__title">
                {name === "signup" && "Регистрация"}
                {name === "signin" && "Вход"}
            </legend>
            <input 
                type="email"
                name="email" 
                id="email-input" 
                className="sign__input" 
                placeholder="Email"
                onChange={onChange}
                value={values.email || ''}
                required
            />
            <span className="sign__error-message" >
                {errorMessages.email}
            </span>
            <input 
                type="text" 
                name="password" 
                id="password-input" 
                className="sign__input" 
                minLength="5" 
                maxLength="16" 
                placeholder="Пароль"
                onChange={onChange}
                value={values.password || ''}
                required
            />
            <span className="sign__error-message" >
                {errorMessages.password}
            </span>
            <button 
                type="submit" 
                className={
                    `sign__submit-button 
                    ${!formIsValid && "sign__submit-button_disabled"}`
                } 
                disabled={!formIsValid}
            >
                {name === "signup" && "Зарегистрироваться"}
                {name === "signin" && "Войти"}
            </button>
        </fieldset>
    </form>
    )
}

export default AuthForm;