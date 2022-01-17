import axios from "axios";

class Api {
    constructor() {
        this.token = sessionStorage.getItem('token') || localStorage.getItem('token') || null;
    }

    responseOk(response) {
        return Boolean(response.status >= 200 && response.status < 300)
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

    async get(ressource, filters={}, orders=[], search='', limit=100000, offset=0) {
        const argFilters = Object.entries(filters).map(filter => filter.join('=')).join('&');
        const argOrders = orders.length ? `ordering=${orders.join(',')}` : '';
        const argSearch = search ? `search=${search}` : '';
        const argPagination = `limit=${limit}&offset=${offset}`;

        let args = [argFilters, argOrders].join('&');
        args = [args, argSearch].join('&');

        const response = await axios.get(
            `/api/${ressource}/?${args}&${argPagination}`,
            this.token ? {headers: {"Authorization": `Token ${this.token}`}} : {},
        )

        return response;
    }
}

export default new Api();
