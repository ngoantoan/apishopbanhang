import {http,httpFile} from "./http_service";
import jwt from 'jsonwebtoken';
import store from '../store';

export function login(user)
{
    return http().post('login', user)
        .then(response => {
            if (response.status === 200) {
                setToken(response.data);
            }
            return response.data;
        });
}

function setToken(user)
{
    const token = jwt.sign({user: user}, 'apishopbanhang');
    localStorage.setItem('api-shop-ban-hang',token);
    store.dispatch('authenticate', user.user);
}

export function isLoggedIn()
{
    const token = localStorage.getItem('api-shop-ban-hang');
    return token != null;
}

export function getAccessToken()
{
    const token = localStorage.getItem('api-shop-ban-hang');

    if (!token) {
        return null
    }

    const tokenData = jwt.decode(token);
    return tokenData.user.user.access_token;
}

export function logout()
{
    http().get('logout');
    localStorage.removeItem('api-shop-ban-hang');
}

export function getProfile()
{
    return http().get('profile');
}
