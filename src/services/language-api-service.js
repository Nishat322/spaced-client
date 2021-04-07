import config from '../config'
import TokenService from '../services/token-service'

const LanguageApiService = {
    getWords() {
        return fetch(`${config.API_ENDPOINT}/language`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TokenService.getAuthToken()}`
                    }
                })
                    .then(res => {
                        return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
                    })
    },

    getNextWord() {
        return fetch(`${config.API_ENDPOINT}/language/head`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TokenService.getAuthToken()}`
                    }
                })
                    .then(res => {
                        return !res.ok ? res.json().then(e => Promise.reject(e)) :res.json()
                    })
    },

    postGuess(guess) {
        return fetch(`${config.API_ENDPOINT}/language/guess`, {
                    method: 'POST',
                    body: JSON.stringify(guess),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TokenService.getAuthToken()}`
                    }
                })
                    .then(res => {
                        return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
                    })
    }
}

export default LanguageApiService
