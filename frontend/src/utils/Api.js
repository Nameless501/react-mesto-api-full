class Api {
    constructor(baseUrl, cohort, token) {
        this._baseUrl = baseUrl;
        this._cohort = cohort;
        this._token = token;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(res.status);
    }

    getCardsData = () => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._checkResponse(res));
    }

    getUserData = () => {
        return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => this._checkResponse(res));
    }

    setUserData = (data) => {
        return fetch(`${this._baseUrl}/${this._cohort}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._checkResponse(res));
    }

    setAvatar = (data) => {
        return fetch(`${this._baseUrl}/${this._cohort}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(res => this._checkResponse(res));
    }

    postCard = (data) => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._checkResponse(res));
    }

    deleteCard = (cardId) => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(res => this._checkResponse(res));
    }

    handleLike = (cardId, isLiked) => {
        return fetch(`${this._baseUrl}/${this._cohort}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {
                authorization: this._token,
            },
        })
            .then(res => this._checkResponse(res));
    }
}

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1',
    cohort: 'cohort-49',
    token: 'b9d286a6-31bd-41da-8959-b9d5c50596c4'
}

const api = new Api(config.baseUrl, config.cohort, config.token);

export default api;