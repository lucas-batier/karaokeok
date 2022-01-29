import {createContext} from 'react';

const userContext = createContext({});

function withUser(Component) {
    return props => (
        <userContext.Consumer>
            {(user) => <Component {...props} user={user} />}
        </userContext.Consumer>
    );
}

export default userContext;

export { withUser };
