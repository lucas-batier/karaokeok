import PropTypes from "prop-types";

class User {
    constructor(data) {
        if (!data || !data.hasOwnProperty) {
            data = {};
        }

        this.id = data.id || null;
        this.username = data.username || null;
        this.firstName = data.first_name || null;
        this.lastName = data.last_name || null;
        this.fullName = (this.firstName && this.lastName) ? `${this.firstName} ${this.lastName}` : null;
        this.email = data.email || null;
        this.isActive = data.is_active || null;
        this.isStaff = data.is_staff || null;
        this.isSuperuser = data.is_superuser || null;
        this.lastLogin = data.last_login || null;
        this.dateJoined = data.date_joined || null;
    }
}

export default User;

export const userShape = PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string,
    isActive: PropTypes.bool,
    isStaff: PropTypes.bool,
    isSuperuser: PropTypes.bool,
    lastLogin: PropTypes.string,
    dateJoined: PropTypes.string,
});
