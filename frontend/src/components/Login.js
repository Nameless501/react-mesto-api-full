import React from 'react';
import AuthForm from './AuthForm.js';

function Login({ handleLogin }) {
    return(
        <section className="sign content__sign">
            <AuthForm
                name='signin'
                handleSubmit={handleLogin}
            />
        </section>
    );
}

export default Login;