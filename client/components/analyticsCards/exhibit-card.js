import {
    Button,
    Card,
    CardContent,
    makeStyles,
    Menu,
    MenuItem,
    Typography
} from '@material-ui/core';
import { format, subMonths, subWeeks, subYears } from 'date-fns';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseURL } from '../../../configuration';
import PropTypes from 'prop-types';

function ExhibitCard({ styles }) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [timeMenu, setTimeMenu] = useState('Today');
    const [exhibitData, setExhibitData] = useState({ name: 'No data', scans: 0 });

    const signBool = exhibitData.scans >= 0;

    const exhibitCardAnalyticsRequest = dateRange => {
        console.log('Making request!');
        axios
            .post(getBaseURL() + 'api/getMostPopularExhibit', dateRange, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            .then(res => {
                if (res.data.success) {
                    setExhibitData({
                        name: res.data.result.mostPopularExhibit.name,
                        scans: res.data.result.mostPopularExhibit.scans
                    });
                } else if (res.data.message === 'jwt expired') {
                    console.log('JWT EXPIRED!');
                    axios
                        .get(getBaseURL() + '/api/refreshAdminUserToken', {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('refreshToken')
                            }
                        })
                        .then(tokenRes => {
                            if (tokenRes.data.success) {
                                console.log('Token Refreshed!');
                                localStorage.setItem(
                                    'accessToken',
                                    tokenRes.data.result.accessToken
                                );
                                axios
                                    .post(getBaseURL() + 'api/getMostPopularExhibit', dateRange, {
                                        headers: {
                                            Authorization:
                                                'Bearer ' + localStorage.getItem('accessToken')
                                        }
                                    })
                                    .then(result => {
                                        if (result.data.success) {
                                            setExhibitData({
                                                name: result.data.result.mostPopularExhibit.name,
                                                scans: result.data.result.mostPopularExhibit.scans
                                            });
                                        }
                                    });
                            }
                        });
                }
            });
    };

    const getDateRanges = timeRange => {
        const today = Date.now();
        const range = {
            startDate: '',
            endDate: format(today, 'yyyy-MM-dd').toString()
        };
        switch (timeRange) {
            case 'Today':
                range.startDate = format(today, 'yyyy-MM-dd').toString();
                break;

            case 'This Week':
                range.startDate = format(subWeeks(today, 1), 'yyyy-MM-dd').toString();
                break;

            case 'This Month':
                range.startDate = format(subMonths(today, 1), 'yyyy-MM-dd').toString();
                break;

            case 'This Year':
                range.startDate = format(subYears(today, 1), 'yyyy-MM-dd').toString();
                break;

            default:
                console.log('Error selecting date range for analytics cards!');
                break;
        }
        exhibitCardAnalyticsRequest(range);
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = item => {
        setAnchorEl(null);
        setTimeMenu(item);
        getDateRanges(item);
    };

    useEffect(() => {
        exhibitCardAnalyticsRequest({
            startDate: format(Date.now(), 'yyyy-MM-dd').toString(),
            endDate: format(Date.now(), 'yyyy-MM-dd').toString()
        });
    }, []);

    return (
        <div>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography component="h3" variant="h6">
                        Popular Exhibit
                    </Typography>
                    <Typography component="span" variant="h5" className={classes.headingText}>
                        {exhibitData.name}
                    </Typography>
                    <div>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            className={signBool ? classes.detailPositive : classes.detailNegative}>
                            {exhibitData.scans + ' scans'}
                        </Typography>
                        <Typography
                            component="span"
                            variante="subtitle1"
                            className={classes.changeText}>
                            {' since ' + timeMenu.toLowerCase()}
                        </Typography>
                    </div>
                </CardContent>
                <div className={classes.topRightMenu}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        {timeMenu}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => handleClose(timeMenu)}>
                        <MenuItem onClick={() => handleClose('Today')}>Today</MenuItem>
                        <MenuItem onClick={() => handleClose('This Week')}>This Week</MenuItem>
                        <MenuItem onClick={() => handleClose('This Month')}>This Month</MenuItem>
                        <MenuItem onClick={() => handleClose('This Year')}>This Year</MenuItem>
                    </Menu>
                </div>
            </Card>
        </div>
    );
}

ExhibitCard.propTypes = {
    styles: PropTypes.object
};

export default ExhibitCard;
