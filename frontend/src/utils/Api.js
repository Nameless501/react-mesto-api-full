import { BASE_URL } from './constants.js';

class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(res.status);
    }

    getCardsData = () => {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {},
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }

    getUserData = () => {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {},
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }

    setUserData = (data) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._checkResponse(res));
    }

    setAvatar = (data) => {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(res => this._checkResponse(res));
    }

    postCard = (data) => {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._checkResponse(res));
    }

    deleteCard = (cardId) => {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {},
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }

    handleLike = (cardId, isLiked) => {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {},
            credentials: 'include',
        })
            .then(res => this._checkResponse(res));
    }
}

const api = new Api(BASE_URL);

export default api;