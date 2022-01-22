import axios from "axios";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class Api {
    constructor() {
        this.apiUrl = process.env.REACT_APP_API_URL || '';
        this.token = sessionStorage.getItem('token') || localStorage.getItem('token') || null;
    }

    async get(url, headers={}, filters=[], orders=[], search='', limit=1000, offset=0) {
        const completeUrl = this.apiUrl + url
        let completeHeaders = headers
        if (this.token) {
            completeHeaders = {"Authorization": `Token ${this.token}`, ...completeHeaders}
        }

        const argFilters = Object.entries({title: 'Take'}).map(filter => filter.join('='));
        const argOrders = orders.length ? `ordering=${orders.join(',')}` : null;
        const argSearch = search ? `search=${search}` : null;
        const argPagination = `limit=${limit}&offset=${offset}`;
        // .filter(Boolean) avoid join on empty fields
        const args = [argFilters, argOrders, argSearch, argPagination].filter(Boolean).join('&');

        return await axios.get(`${completeUrl}/?${args}`, completeHeaders);
    }

    async post(url, body={}, headers={}) {
        const completeUrl = this.apiUrl + url
        let completeHeaders = headers
        if (this.token) {
            completeHeaders = {"Authorization": `Token ${this.token}`, ...completeHeaders}
        }

        return await axios.post(completeUrl, body, completeHeaders);
    }

    responseOk(response) {
        return Boolean(response.status >= 200 && response.status < 300);
    }

    async login(username, password, remainConnection) {
        const response = await axios.post(`/login/`, {"username": username, "password": password});

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
        const response = await axios.post(`/register/`,
            {
                "first_name": firstName,
                "last_name": lastName,
                "username": username,
                "email": username,
                "password": password,
                "password_confirmation": passwordConfirmation,
            }
        );

        return response;
    }
}

export default new Api();
