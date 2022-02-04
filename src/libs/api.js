import axios from "axios";
import {removeCurrentUserFromStorage} from "./user";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Api {
    constructor() {
        this.apiBaseUrl = process.env.REACT_APP_API_BASE_URL || '';
        this.token = sessionStorage.getItem('token') || localStorage.getItem('token') || null;
    }

    async get(url, filters=[], orders=[], search='', limit=1000, offset=0, withToken=true) {
        const headers = (withToken && this.token) ? {"Authorization": `Token ${this.token}`} : {};

        const argFilters = Object.entries(filters).map(filter => filter.join('='));
        const argOrders = orders.length ? `ordering=${orders.join(',')}` : null;
        const argSearch = search ? `search=${search}` : null;
        const argPagination = `limit=${limit}&offset=${offset}`;
        // .filter(Boolean) avoid join on empty fields
        const args = [argFilters, argOrders, argSearch, argPagination].filter(Boolean).join('&');

        return await axios({
            url: `${url}/?${args}`,
            method: 'get',
            baseURL: this.apiBaseUrl,
            headers: headers,
        })
    }

    async post(url, data={}, withToken=true) {
        const headers = (withToken && this.token) ? {"Authorization": `Token ${this.token}`} : {};

        return await axios({
            url: url,
            method: 'post',
            baseURL: this.apiBaseUrl,
            headers: headers,
            data: data,
        })
    }

    async patch(url, data={}) {
        const headers = this.token ? {"Authorization": `Token ${this.token}`} : {};

        return await axios({
            url: url,
            method: 'patch',
            baseURL: this.apiBaseUrl,
            headers: headers,
            data: data,
        })
    }

    responseOk(response) {
        return Boolean(response.status >= 200 && response.status < 300);
    }

    async login(username, password, remainConnection=true) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        removeCurrentUserFromStorage();

        const response = await this.post(`api/login/`, {"username": username, "password": password});

        if (this.responseOk(response)) {
            if (remainConnection) {
                localStorage.setItem('token', response.data.token);
            } else {
                sessionStorage.setItem('token', response.data.token);
            }
        }

        return response;
    }

    async register(firstName, lastName, username, password, passwordConfirmation) {
        return await this.post(`api/register/`,
            {
                "first_name": firstName,
                "last_name": lastName,
                "username": username,
                "email": username,
                "password": password,
                "password_confirmation": passwordConfirmation,
            }
        );
    }

    async passwordReset(email) {
        return await this.post(`api/password_reset/`,
            {
                "email": email,
            },
            false,
        );
    }
}

export default new Api();
