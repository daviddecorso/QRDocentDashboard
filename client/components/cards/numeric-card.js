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
import getChangeWording from '../../util/getChangeWording';
import getPercent from '../../util/getPercent';
import PropTypes from 'prop-types';

function NumericCard({ styles }) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [timeMenu, setTimeMenu] = useState('Today');
    const [scansData, setScansData] = useState({ numScans: 0, percent: 0 });

    const signBool = scansData.percent >= 0;
    const sign = signBool ? '+' : '';

    const scansCardAnalyticsRequest = (dateRange, compareRange) => {
        console.log('Making request!');
        let compareData = 0;
        axios
            .post(getBaseURL() + 'api/getTotalScans', compareRange, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            .then(compareRes => {
                if (compareRes.data.success) {
                    compareData = compareRes.data.result.totalScans;
                    axios
                        .post(getBaseURL() + 'api/getTotalScans', dateRange, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                            }
                        })
                        .then(cardRes => {
                            if (cardRes.data.success) {
                                setScansData({
                                    numScans: cardRes.data.result.totalScans,
                                    percent: getPercent(cardRes.data.result.totalScans, compareData)
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
                                    .post(getBaseURL() + 'api/getTotalScans', compareRange, {
                                        headers: {
                                            Authorization:
                                                'Bearer ' + localStorage.getItem('accessToken')
                                        }
                                    })
                                    .then(res => {
                                        if (res.data.success) {
                                            compareData = res.data.result.totalScans;
                                        }
                                        axios
                                            .post(getBaseURL() + 'api/getTotalScans', dateRange, {
                                                headers: {
                                                    Authorization:
                                                        'Bearer ' +
                                                        localStorage.getItem('accessToken')
                                                }
                                            })
                                            .then(cardRes => {
                                                if (cardRes.data.success) {
                                                    setScansData({
                                                        numScans: cardRes.data.result.totalScans,
                                                        percent: getPercent(
                                                            cardRes.data.result.totalScans,
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
        scansCardAnalyticsRequest(range, compareRange);
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
        scansCardAnalyticsRequest(
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
                        Total Scans
                    </Typography>
                    <Typography component="span" variant="h4" className={classes.headingText}>
                        {scansData.numScans.toLocaleString()}
                    </Typography>
                    <div>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            className={signBool ? classes.detailPositive : classes.detailNegative}>
                            {sign + Math.ceil(scansData.percent) + '%'}
                        </Typography>
                        <Typography
                            component="span"
                            variante="subtitle1"
                            className={classes.changeText}>
                            {' Since ' + getChangeWording(timeMenu)}
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

NumericCard.propTypes = {
    styles: PropTypes.object,
    data: PropTypes.object
};

export default NumericCard;
