export function responseOk(response) {
    return Boolean(response.status >= 200 && response.status < 300);
}

export function errorMessage(response) {
    if (responseOk(response)) {
        return
    }

    switch (response.status) {
        // Bad request (400) errors are managed by the helperText within the component
        case 401:
            return 'Connecte toi pour accéder à cette action';
        case 403:
            return 'Connecte toi pour accéder à cette action';
        case 500:
            return 'Une erreur est apparue, réessaye plus tard';
        default:
            return response.data[Object.keys(response.data)[0]];
    }
}
