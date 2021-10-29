import axios from 'axios';
import { getBaseURL } from '../../configuration';

export default function refreshToken() {
    const token = localStorage.getItem('refreshToken');

    axios
        .get(getBaseURL() + '/api/refreshAdminUserToken', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            console.log(res);
            if (res.data.success) {
                localStorage.setItem('accessToken', res.data.result.accessToken);
                return true;
            } else {
                // If a user's refresh token is invalid we want them to login again.
                console.error('Invalid refresh token.');
                localStorage.setItem('accessToken', 'logout');
                localStorage.setItem('refreshToken', 'logout');
                location.assign(getBaseURL() + '/login');
                return false;
            }
        })
        .catch(err => {
            console.error(err);
            return false;
        });
}
