import axios from 'axios';
import { getBaseURL } from '../../configuration';
import refreshToken from './refresh';

export default function getExhibits(setExhibits, setRefreshed) {
    axios
        .get(getBaseURL() + 'api/getAllMuseumExhibits', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        .then(res => {
            console.log(res);
            if (res.data.success) {
                setExhibits(res.data.result.exhibits);
            } else {
                console.log('We need to refresh!');
                refreshToken.then(tokenRes => {
                    console.log(tokenRes);
                    axios
                        .get(getBaseURL() + 'api/getAllMuseumExhibits', {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                            }
                        })
                        .then(refreshRes => {
                            if (setRefreshed !== null) {
                                setRefreshed(refreshRes);
                            }
                        });
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
}
