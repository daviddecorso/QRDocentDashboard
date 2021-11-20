import axios from 'axios';
import { getBaseURL } from '../../configuration';

export default function getExhibits(setExhibits, setRefreshed, setNoExhibits) {
    axios
        .get(getBaseURL() + 'api/getAllMuseumExhibits', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        .then(res => {
            console.log(res);
            if (res.data.success) {
                if (res.data.result.exhibits.length === 0) {
                    setNoExhibits(true);
                }
                setExhibits(res.data.result.exhibits);
            } else {
                console.log('We need to refresh!');
                axios
                    .get(getBaseURL() + '/api/refreshAdminUserToken', {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('refreshToken')
                        }
                    })
                    .then(tokenRes => {
                        if (tokenRes.data.success) {
                            console.log('Token Refreshed!');
                            localStorage.setItem('accessToken', tokenRes.data.result.accessToken);
                            axios
                                .get(getBaseURL() + 'api/getAllMuseumExhibits', {
                                    headers: {
                                        Authorization: 'Bearer ' + tokenRes.data.result.accessToken
                                    }
                                })
                                .then(refreshRes => {
                                    if (setRefreshed !== null) {
                                        setRefreshed(refreshRes);
                                    }
                                })
                                .catch(refreshErr => console.log(refreshErr));
                        } else {
                            // If a user's refresh token is invalid we want them to login again.
                            console.error('Invalid refresh token.');
                            localStorage.setItem('accessToken', 'logout');
                            localStorage.setItem('refreshToken', 'logout');
                            location.assign(getBaseURL() + '/login');
                        }
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
}
