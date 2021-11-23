import { Chip, makeStyles, Modal, Typography, useMediaQuery } from '@material-ui/core';
import { CSSGrid, makeResponsive, measureItems } from 'react-stonecutter';
import { format, getDate, getMonth, parseISO } from 'date-fns';
import { IconCalendarStats, IconChartBar, IconClock, IconRoute } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BumpChart from '../components/charts/bump-chart';
import { DateRangePicker } from 'react-date-range';
import ExhibitCard from '../components/analyticsCards/exhibit-card';
import { getBaseURL } from '../../configuration';
import getMinutesFromTimestamp from '../util/getMinutesFromTimestamp';
import LineGraph from '../components/charts/line-graph';
import NumericCard from '../components/analyticsCards/numeric-card';
import PieChart from '../components/charts/pie-chart';
import { Skeleton } from '@material-ui/lab';
import TimeCard from '../components/analyticsCards/time-card';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Default colors for charts
const theme = {
    background: '#2F333C',
    textColor: '#FFFFFF',
    fontSize: 12,
    axis: {
        domain: {
            line: {
                stroke: '#8d9cab',
                strokeWidth: 1
            }
        },
        ticks: {
            line: {
                stroke: '#8d9cab',
                strokeWidth: 1
            }
        }
    },
    grid: {
        line: {
            stroke: '#9c9c9c',
            strokeWidth: 1
        }
    }
};

const cardStyles = {
    root: {
        maxWidth: '328px',
        width: '100vw',
        height: '148px',
        borderRadius: '20px',
        backgroundColor: '#2F333C',
        display: 'flex',
        justifyContent: 'space-between'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '211px'
    },
    topRightMenu: {
        alignSelf: 'baseline',
        marginRight: '10px',
        paddingTop: '5px'
    },
    detailPositive: {
        color: '#4cdc52',
        backgroundColor: '#4caf501a'
    },
    detailNegative: {
        color: '#f44336',
        backgroundColor: '#90423c1a'
    },
    detailText: {
        color: '#ccc'
    },
    headingText: {
        marginTop: '.45rem',
        marginBottom: '.45rem'
    }
};

const pageStyles = {
    cardLayoutDesktop: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        maxWidth: '1050px'
    },
    mobileCardLayout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& div': {
            marginBottom: '.5rem'
        }
    },
    chipDiv: {
        marginTop: '1rem',
        marginBottom: '2rem',
        display: 'flex',
        '& div': {
            marginLeft: '1rem'
        }
    },
    analyticsDiv: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        gridAutoFlow: 'row'
    },
    datePicker: {
        backgroundColor: 'white',
        color: 'black',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        paddingTop: '.5rem',
        paddingBottom: '.5rem',
        textAlign: 'center'
    },
    graphSkeleton: {
        borderRadius: '20px'
    }
};

export default function Analytics() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const isMobile = useMediaQuery('(max-width: 960px)');
    const isMedium = useMediaQuery('(max-width: 1339px)');

    const [isLoading, setIsLoading] = useState(false);

    // State for filters
    const [timeFilter, setTimeFilter] = useState(true);
    const [scansFilter, setScansFilter] = useState(true);
    const [pathingFilter, setPathingFilter] = useState(true);

    // State for charts
    const [totalScansData, setTotalScansData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    const [percentData, setPercentData] = useState([]);
    const [rankData, setRankData] = useState([]);

    // Defines grid for charts
    const Grid = makeResponsive(measureItems(CSSGrid), {
        maxWidth: isMedium ? 700 : 1500,
        minPadding: 100
    });

    // State for date range
    const [showDateRange, setShowDateRange] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const setTotalScansGraph = res => {
        const scansData = [{ id: 'Scans', color: 'hsl(172, 70%, 50%)', data: [] }];
        res.data.result.dates.forEach(date => {
            scansData[0].data.push({
                x: getMonth(parseISO(date.date)) + 1 + '/' + getDate(parseISO(date.date)),
                y: date.totalScans
            });
        });
        const tempArray = scansData[0].data;
        tempArray.reverse();
        scansData[0].data = tempArray;
        setTotalScansData(scansData);
    };

    const setTimeGraph = res => {
        const timeArr = [{ id: 'Minutes', color: 'hsl(172, 70%, 50%)', data: [] }];
        res.data.result.dates.forEach(date => {
            timeArr[0].data.push({
                x: getMonth(parseISO(date.date)) + 1 + '/' + getDate(parseISO(date.date)),
                y: getMinutesFromTimestamp(date.averageUserVisit)
            });
        });

        const tempArray = timeArr[0].data;
        tempArray.reverse();
        timeArr[0].data = tempArray;
        setTimeData(timeArr);
    };

    const setPercentGraph = res => {
        const percentArr = [];
        res.data.result.exhibitPercentages.forEach(exhibit => {
            percentArr.push({
                id: exhibit.name,
                label: exhibit.name,
                value: Number(exhibit.exhibitScansPercentage) / 100
            });
        });
        setPercentData(percentArr);
    };

    const setRankGraph = res => {
        const rankArr = [];
        if (res.data.result.dates.length > 0) {
            res.data.result.dates[0].exhibitAnalytics.forEach(exhibit => {
                rankArr.push({ id: exhibit.name, data: [] });
            });
            res.data.result.dates.forEach(date => {
                for (let i = 0; i < date.exhibitAnalytics.length; i++) {
                    rankArr[i].data.push({
                        x: getMonth(parseISO(date.date)) + 1 + '/' + getDate(parseISO(date.date)),
                        y: date.exhibitAnalytics[i].scans
                    });
                }
            });
        }

        rankArr.forEach(exhibit => {
            exhibit.data.reverse();
        });
        setRankData(rankArr);
    };

    const graphAnalyticsRequest = body => {
        setIsLoading(true);
        axios
            .post(getBaseURL() + 'api/getGraphAnalytics', body, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            .then(res => {
                console.log(res);
                if (!res.data.success) {
                    if (res.data.message === 'jwt expired') {
                        console.log('JWT EXPIRED!');
                        axios
                            .get(getBaseURL() + 'api/refreshAdminUserToken', {
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
                                        .post(getBaseURL() + 'api/getGraphAnalytics', body, {
                                            headers: {
                                                Authorization:
                                                    'Bearer ' + tokenRes.data.result.accessToken
                                            }
                                        })
                                        .then(result => {
                                            // success!
                                            console.log(result);
                                            setTotalScansGraph(result);
                                            setTimeGraph(result);
                                            setPercentGraph(result);
                                            setRankGraph(result);
                                            setIsLoading(false);
                                        })
                                        .catch(err => {
                                            // error!!
                                            console.log(err);
                                        });
                                } else {
                                    // If a user's refresh token is invalid we want them to login again.
                                    console.error('Invalid refresh token.');
                                    localStorage.setItem('accessToken', 'logout');
                                    localStorage.setItem('refreshToken', 'logout');
                                    location.assign(getBaseURL() + '/login');
                                }
                            });
                    }
                } else {
                    // success
                    setTotalScansGraph(res);
                    setTimeGraph(res);
                    setPercentGraph(res);
                    setRankGraph(res);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    // Getting today's analytics data to use as initial state.
    useEffect(() => {
        setIsLoading(true);
        const body = {
            startDate: format(Date.now(), 'yyyy-MM-dd').toString(),
            endDate: format(Date.now(), 'yyyy-MM-dd').toString()
        };
        graphAnalyticsRequest(body);
    }, []);

    const getAnalytics = () => {
        const body = {
            startDate: format(dateRange[0].startDate, 'yyyy-MM-dd').toString(),
            endDate: format(dateRange[0].endDate, 'yyyy-MM-dd').toString()
        };
        console.log(body);
        graphAnalyticsRequest(body);
    };

    const handleClose = () => {
        setShowDateRange(false);
        getAnalytics();
        console.log('Closed');
    };

    return (
        <div>
            <div className={'content'}>
                <div style={{ marginLeft: '30px' }}>
                    <Typography component="h1" variant="h2">
                        ANALYTICS
                    </Typography>
                    <div className={classes.chipDiv}>
                        <div style={{ color: 'black' }}>
                            <Chip
                                label="Daterange"
                                color="primary"
                                icon={<IconCalendarStats color={'white'} />}
                                onClick={() => {
                                    setShowDateRange(true);
                                }}
                            />
                            <Modal open={showDateRange} onClose={handleClose}>
                                <div className={classes.datePicker}>
                                    <DateRangePicker
                                        editableDateInputs={true}
                                        onChange={item => {
                                            setDateRange([item.selection]);
                                        }}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dateRange}
                                    />
                                </div>
                            </Modal>
                        </div>
                        {!timeFilter && (
                            <Chip
                                label="Time"
                                variant="outlined"
                                color="secondary"
                                icon={<IconClock />}
                                onClick={() => {
                                    setTimeFilter(true);
                                }}
                            />
                        )}
                        {timeFilter && (
                            <Chip
                                label="Time"
                                color="secondary"
                                icon={<IconClock />}
                                onClick={() => {
                                    setTimeFilter(false);
                                }}
                            />
                        )}
                        {!scansFilter && (
                            <Chip
                                label="Popularity"
                                variant="outlined"
                                color="secondary"
                                icon={<IconChartBar />}
                                onClick={() => {
                                    setScansFilter(true);
                                }}
                            />
                        )}
                        {scansFilter && (
                            <Chip
                                label="Popularity"
                                color="secondary"
                                icon={<IconChartBar />}
                                onClick={() => {
                                    setScansFilter(false);
                                }}
                            />
                        )}
                        {!pathingFilter && (
                            <Chip
                                label="Pathing"
                                variant="outlined"
                                color="secondary"
                                icon={<IconRoute />}
                                onClick={() => {
                                    setPathingFilter(true);
                                }}
                            />
                        )}
                        {pathingFilter && (
                            <Chip
                                label="Pathing"
                                color="secondary"
                                icon={<IconRoute />}
                                onClick={() => {
                                    setPathingFilter(false);
                                }}
                            />
                        )}
                    </div>
                    <div
                        className={isMobile ? classes.mobileCardLayout : classes.cardLayoutDesktop}>
                        <NumericCard styles={cardStyles} />
                        <TimeCard styles={cardStyles} />
                        <ExhibitCard styles={cardStyles} />
                    </div>
                    {!isLoading && (
                        <Grid
                            style={{ marginBottom: '1rem' }}
                            columnWidth={500}
                            gutterWidth={20}
                            gutterHeight={20}
                            itemHeight={450}
                            duration={300}
                            easing="ease-in-out">
                            {scansFilter && (
                                <div key="totalScans">
                                    <LineGraph
                                        title={'Total Scans'}
                                        data={totalScansData}
                                        theme={theme}
                                        yAxis={'Scans'}
                                    />
                                </div>
                            )}
                            {scansFilter && (
                                <div key="scansPie">
                                    <PieChart
                                        title={'Exhibit Scans Percentage'}
                                        data={percentData}
                                        theme={theme}
                                    />
                                </div>
                            )}
                            {timeFilter && (
                                <div key="averageTotalTimeLine">
                                    <LineGraph
                                        title={'Average Visit Length'}
                                        data={timeData}
                                        theme={theme}
                                        yAxis={'Minutes'}
                                    />
                                </div>
                            )}
                            {scansFilter && (
                                <div key="exhibitRanking">
                                    <BumpChart
                                        title={'Exhibit Rank'}
                                        data={rankData}
                                        theme={theme}
                                    />
                                </div>
                            )}
                        </Grid>
                    )}
                    {isLoading && (
                        <Grid
                            style={{ marginBottom: '1rem' }}
                            columnWidth={500}
                            gutterWidth={20}
                            gutterHeight={20}
                            itemHeight={450}
                            duration={300}
                            easing="ease-in-out">
                            <div>
                                <Skeleton
                                    className={classes.graphSkeleton}
                                    variant="rect"
                                    width={500}
                                    height={450}
                                />
                            </div>
                            <div>
                                <Skeleton
                                    className={classes.graphSkeleton}
                                    variant="rect"
                                    width={500}
                                    height={450}
                                />
                            </div>
                            <div>
                                <Skeleton
                                    className={classes.graphSkeleton}
                                    variant="rect"
                                    width={500}
                                    height={450}
                                />
                            </div>
                            <div>
                                <Skeleton
                                    className={classes.graphSkeleton}
                                    variant="rect"
                                    width={700}
                                    height={450}
                                />
                            </div>
                        </Grid>
                    )}
                </div>
            </div>
        </div>
    );
}
