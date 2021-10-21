import axios from 'axios';
import { getBaseURL } from '../../configuration';
import { useHistory } from 'react-router';

export default function refreshToken() {
    const token = localStorage.getItem('refreshToken');
    const history = useHistory();

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
            } else {
                // If a user's refresh token is invalid we want them to login again.
                console.error('Invalid refresh token.');
                localStorage.setItem('accessToken', 'logout');
                localStorage.setItem('refreshToken', 'logout');
                history.replace('/login');
            }
        })
        .catch(err => {
            console.error(err);
        });
}
