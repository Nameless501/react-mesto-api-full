import { BASE_URL } from './constants.js';

class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(res.status);
    }

    getCardsData = (token) => {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => this._checkResponse(res));
    }

    getUserData = (token) => {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => this._checkResponse(res));
    }

    setUserData = (data, token) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._checkResponse(res));
    }

    setAvatar = (data, token) => {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(res => this._checkResponse(res));
    }

    postCard = (data, token) => {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._checkResponse(res));
    }

    deleteCard = (cardId, token) => {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => this._checkResponse(res));
    }

    handleLike = (cardId, isLiked, token) => {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => this._checkResponse(res));
    }
}

const api = new Api(BASE_URL);

export default api;