import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm.js';

function Register({ handleRegister }) {
    return(
        <section className="sign content__sign">
            <AuthForm
                name='signup'
                handleSubmit={handleRegister}
            />
            <p className="sign__caption" >
                Уже зарегистрированы?&nbsp;
                <Link className="sign__link" to="/sign-in" >
                    Войти
                </Link>
            </p>
        </section>
    );
}

export default Register;