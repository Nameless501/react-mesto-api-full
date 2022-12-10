import { BASE_URL } from './constants.js';

function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            password,
            email
        })
    })
        .then(res => checkResponse(res))
}

export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password,
            email
        })
    })
        .then(res => checkResponse(res));
}

export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => checkResponse(res));
}

export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {},
    })
        .then(res => checkResponse(res));
}