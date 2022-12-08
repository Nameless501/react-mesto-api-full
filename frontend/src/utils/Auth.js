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
        .then(response => checkResponse(response))
}

export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json" 
        },
        credentials: 'include',
        body: JSON.stringify({
            password,
            email
        })
    })
        .then(response => checkResponse(response));
}

export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: 'POST',
        headers: {},
        credentials: 'include',
    })
        .then(response => checkResponse(response));
}

export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    })
        .then(response => checkResponse(response));
}