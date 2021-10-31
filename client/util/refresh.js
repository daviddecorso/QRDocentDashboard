import axios from 'axios';
import { getBaseURL } from '../../configuration';

const refreshToken = new Promise((success, failure) => {
    const token = localStorage.getItem('refreshToken');

    axios
        .get(getBaseURL() + '/api/refreshAdminUserToken', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.data.success) {
                console.log('Token Refreshed!');
                localStorage.setItem('accessToken', res.data.result.accessToken);
                success(true);
            } else {
                // If a user's refresh token is invalid we want them to login again.
                console.error('Invalid refresh token.');
                localStorage.setItem('accessToken', 'logout');
                localStorage.setItem('refreshToken', 'logout');
                location.assign(getBaseURL() + '/login');
                failure(new Error('Error'));
            }
        })
        .catch(err => {
            console.error(err);
            failure(new Error('Error'));
        });
});

export default refreshToken;
