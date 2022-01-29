import User from "../models/users";

function getCurrentUserFromStorage() {
    return new User({
        id: localStorage.getItem('id') || null,
        username: localStorage.getItem('username') || null,
        first_name: localStorage.getItem('firstName') || null,
        last_name: localStorage.getItem('lastName') || null,
        email: localStorage.getItem('email') || null,
        is_active: localStorage.getItem('isActive') || null,
        is_staff: localStorage.getItem('isStaff') || null,
        is_superuser: localStorage.getItem('isSuperuser') || null,
        last_login: localStorage.getItem('lastLogin') || null,
        date_joined: localStorage.getItem('dateJoined') || null,
    });
}

function setCurrentUserInStorage(user) {
    localStorage.setItem('id', user.id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('email', user.email);
    localStorage.setItem('isActive', user.isActive);
    localStorage.setItem('isStaff', user.isStaff);
    localStorage.setItem('isSuperuser', user.isSuperuser);
    localStorage.setItem('lastLogin', user.lastLogin);
    localStorage.setItem('dateJoined', user.dateJoined);
}

export { getCurrentUserFromStorage, setCurrentUserInStorage };
