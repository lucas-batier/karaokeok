import User from "../models/users";
import {extensiveBool} from "./tools";

function getCurrentUserFromStorage() {
    return new User({
        id: parseInt(localStorage.getItem('id')) || undefined,
        username: localStorage.getItem('username') || undefined,
        first_name: localStorage.getItem('firstName') || undefined,
        last_name: localStorage.getItem('lastName') || undefined,
        email: localStorage.getItem('email') || undefined,
        is_active: extensiveBool(localStorage.getItem('isActive')) || undefined,
        is_staff: extensiveBool(localStorage.getItem('isStaff')) || undefined,
        is_superuser: extensiveBool(localStorage.getItem('isSuperuser')) || undefined,
        last_login: localStorage.getItem('lastLogin') || undefined,
        date_joined: localStorage.getItem('dateJoined') || undefined,
    });
}

function setCurrentUserInStorage(user) {
    (null !== user.id) && localStorage.setItem('id', user.id.toString());
    (null !== user.username) && localStorage.setItem('username', user.username);
    (null !== user.firstName) && localStorage.setItem('firstName', user.firstName);
    (null !== user.lastName) && localStorage.setItem('lastName', user.lastName);
    (null !== user.email) && localStorage.setItem('email', user.email);
    (null !== user.isActive) && localStorage.setItem('isActive', user.isActive.toString());
    (null !== user.isStaff) && localStorage.setItem('isStaff', user.isStaff.toString());
    (null !== user.isSuperuser) && localStorage.setItem('isSuperuser', user.isSuperuser.toString());
    (null !== user.lastLogin) && localStorage.setItem('lastLogin', user.lastLogin);
    (null !== user.dateJoined) && localStorage.setItem('dateJoined', user.dateJoined);
}

function removeCurrentUserFromStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('isActive');
    localStorage.removeItem('isStaff');
    localStorage.removeItem('isSuperuser');
    localStorage.removeItem('lastLogin');
    localStorage.removeItem('dateJoined');
}

export { getCurrentUserFromStorage, setCurrentUserInStorage, removeCurrentUserFromStorage };
