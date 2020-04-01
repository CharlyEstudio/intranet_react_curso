import { BASE_PATH } from './config';

export function crearUsuario(data) {
    const url = `${BASE_PATH}/usuario`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}

export function loginUsuario(data) {
    const url = `${BASE_PATH}/login`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}