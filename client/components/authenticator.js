import React, { useState } from 'react';
import authContext from '../contexts/auth';
import axios from 'axios';
import { getBaseURL } from '../../configuration';
import PropTypes from 'prop-types';

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const userFromBody = body => ({
        accessToken: body.accessToken
    });

    const signin = (email, password) => {
        axios
            .post(getBaseURL() + 'api/loginAdminUser', {
                email: email,
                password: password
            })
            .then(res => {
                console.log(res);
                console.log(user);
                console.log(res.data);
                if (res.data.success) {
                    setUser(userFromBody(res.data));
                } else {
                    console.log('Wrong email or password.');
                }
            })
            .catch(err => {
                // TODO: set err state here
                console.log(err);
            });
    };

    return {
        user,
        signin
    };
}

function Authenticator({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

Authenticator.propTypes = {
    children: PropTypes.object
};

export default Authenticator;
