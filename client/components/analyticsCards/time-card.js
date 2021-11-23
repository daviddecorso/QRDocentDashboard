import {
    Button,
    Card,
    CardContent,
    makeStyles,
    Menu,
    MenuItem,
    Typography
} from '@material-ui/core';
import { format, subDays, subMonths, subWeeks, subYears } from 'date-fns';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseURL } from '../../../configuration';
import getMinutesFromTimestamp from '../../util/getMinutesFromTimestamp';
import getPercent from '../../util/getPercent';
import PropTypes from 'prop-types';

const getHrs = mins => Math.floor(mins / 60);

const getMins = mins => mins % 60;

function TimeCard({ styles }) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [timeMenu, setTimeMenu] = useState('Today');
    const [timeData, setTimeData] = useState({ time: 0, percent: 0 });

    const signBool = timeData.percent >= 0;
    const sign = signBool ? '+' : '';

    const timeCardAnalyticsRequest = (dateRange, compareRange) => {
        console.log('Making request!');
        let compareData = 0;
        axios
            .post(getBaseURL() + 'api/getAverageUserVisit', compareRange, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            .then(compareRes => {
                if (compareRes.data.success) {
                    compareData = getMinutesFromTimestamp(compareRes.data.result.averageUserVisit);
                    axios
                        .post(getBaseURL() + 'api/getAverageUserVisit', dateRange, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                            }
                        })
                        .then(cardRes => {
                            if (cardRes.data.success) {
                                setTimeData({
                                    time: getMinutesFromTimestamp(
                                        cardRes.data.result.averageUserVisit
                                    ),
                                    percent: getPercent(
                                        getMinutesFromTimestamp(
                                            cardRes.data.result.averageUserVisit
                                        ),
                                        compareData
                                    )
                                });
                            }
                        });
                } else if (compareRes.data.message === 'jwt expired') {
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
                                    .post(getBaseURL() + 'api/getAverageUserVisit', compareRange, {
                                        headers: {
                                            Authorization:
                                                'Bearer ' + localStorage.getItem('accessToken')
                                        }
                                    })
                                    .then(res => {
                                        if (res.data.success) {
                                            compareData = getMinutesFromTimestamp(
                                                res.data.result.averageUserVisit
                                            );
                                        }
                                        axios
                                            .post(
                                                getBaseURL() + 'api/getAverageUserVisit',
                                                dateRange,
                                                {
                                                    headers: {
                                                        Authorization:
                                                            'Bearer ' +
                                                            localStorage.getItem('accessToken')
                                                    }
                                                }
                                            )
                                            .then(cardRes => {
                                                if (cardRes.data.success) {
                                                    setTimeData({
                                                        time: getMinutesFromTimestamp(
                                                            cardRes.data.result.averageUserVisit
                                                        ),
                                                        percent: getPercent(
                                                            getMinutesFromTimestamp(
                                                                cardRes.data.result.averageUserVisit
                                                            ),
                                                            compareData
                                                        )
                                                    });
                                                }
                                            });
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
        const compareRange = {
            startDate: '',
            endDate: ''
        };
        switch (timeRange) {
            case 'Today':
                range.startDate = format(today, 'yyyy-MM-dd').toString();
                compareRange.startDate = format(subDays(today, 1), 'yyyy-MM-dd').toString();
                compareRange.endDate = compareRange.startDate;
                break;

            case 'This Week':
                range.startDate = format(subWeeks(today, 1), 'yyyy-MM-dd').toString();
                compareRange.startDate = format(subWeeks(today, 2), 'yyyy-MM-dd').toString();
                compareRange.endDate = range.startDate;

                break;

            case 'This Month':
                range.startDate = format(subMonths(today, 1), 'yyyy-MM-dd').toString();
                compareRange.startDate = format(subMonths(today, 2), 'yyyy-MM-dd').toString();
                compareRange.endDate = range.startDate;

                break;

            case 'This Year':
                range.startDate = format(subYears(today, 1), 'yyyy-MM-dd').toString();
                compareRange.startDate = format(subYears(today, 2), 'yyyy-MM-dd').toString();
                compareRange.endDate = range.startDate;

                break;

            default:
                console.log('Error selecting date range for analytics cards!');
                break;
        }
        timeCardAnalyticsRequest(range, compareRange);
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
        timeCardAnalyticsRequest(
            {
                startDate: format(Date.now(), 'yyyy-MM-dd').toString(),
                endDate: format(Date.now(), 'yyyy-MM-dd').toString()
            },
            {
                startDate: format(subDays(Date.now(), 1), 'yyyy-MM-dd').toString(),
                endDate: format(subDays(Date.now(), 1), 'yyyy-MM-dd').toString()
            }
        );
    }, []);

    return (
        <div>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography component="h3" variant="h6">
                        Average Visit
                    </Typography>
                    <div className={classes.headingText}>
                        <Typography component="span" variant="h4" className={classes.headingText}>
                            {getHrs(timeData.time)}
                        </Typography>
                        <Typography component="span" variant="body2">
                            {'HRS '}
                        </Typography>
                        <Typography component="span" variant="h4" className={classes.headingText}>
                            {getMins(timeData.time)}
                        </Typography>
                        <Typography component="span" variant="body2">
                            {'MINS'}
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            className={signBool ? classes.detailPositive : classes.detailNegative}>
                            {sign + Math.ceil(timeData.percent) + '%'}
                        </Typography>
                        <Typography
                            component="span"
                            variante="subtitle1"
                            className={classes.changeText}>
                            {' Since ' + timeMenu.toLowerCase()}
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

TimeCard.propTypes = {
    styles: PropTypes.object
};

export default TimeCard;
