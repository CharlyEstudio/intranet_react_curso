import { BASE_PATH } from './config';
import { ACCESS_TOKEN, MENU, USUARIO } from '../utils/constants';
import jwtDecode from 'jwt-decode';

export function getAccessToken() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken || accessToken === 'null') {
        return false;
    }

    return willExpireToken(accessToken) ? null : accessToken;
}

export function actualizarToken(token) {
    const url = `${BASE_PATH}/login/renuevatoken?token=${token}`;
    const params = {
        method: 'GET'
    };
    fetch(url, params)
        .then(response => {
            return response();
        })
        .then(result => {
            if (!result.ok) {
                logout();
                return false;
            } else {
                localStorage.setItem(ACCESS_TOKEN, result.token);
                return true;
            }
        });
}

export function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USUARIO);
    localStorage.removeItem(MENU);
}

function willExpireToken(token) {
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000;
    return now > exp;
}