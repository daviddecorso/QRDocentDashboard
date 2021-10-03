import { Chip, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { CSSGrid, makeResponsive, measureItems } from 'react-stonecutter';
import { IconCalendarStats, IconChartBar, IconClock, IconRoute } from '@tabler/icons';
import React, { useState } from 'react';
import BumpChart from '../components/charts/bump-chart';
import ExhibitCard from '../components/cards/exhibit-card';
import LineGraph from '../components/charts/line-graph';
import NumericCard from '../components/cards/numeric-card';
import PieChart from '../components/charts/pie-chart';
import TimeCard from '../components/cards/time-card';

const mockDataTime = {
    avgLengthMins: 141,
    percent: 5.6
};

const mockDataNumScans = {
    numScans: 16987,
    percent: -12.4
};

const mockDataExhibit = {
    name: 'Aretha Franklin',
    change: 2
};

// Data for total scans chart, x-axis represents the date and the y-axis repesentes total scans
const totalScansData = [
    {
        id: 'Scans',
        color: 'hsl(172, 70%, 50%)',
        data: [
            { x: '14', y: '912' },
            { x: '15', y: '712' },
            { x: '16', y: '200' },
            { x: '17', y: '788' },
            { x: '18', y: '600' },
            { x: '19', y: '722' },
            { x: '20', y: '650' }
        ]
    }
];

// Data for pie chart, value reperesnts percent of total scans
// Alternatively, the value could represent number of scans
const scansPieData = [
    {
        id: 'Aretha Franklin',
        label: 'Aretha Franklin',
        value: 73.2
    },
    {
        id: 'James Brown',
        label: 'James Brown',
        value: 26.8
    }
];

// Data for average time spent in musuem over time line graph
// x-axis represents date and y-axis represents time in hours
const avgTimeData = [
    {
        id: 'Average Time',
        color: 'hsl(172, 70%, 50%)',
        data: [
            { x: '14', y: '1.52' },
            { x: '15', y: '2.64' },
            { x: '16', y: '2.01' },
            { x: '17', y: '2.22' },
            { x: '18', y: '1.96' },
            { x: '19', y: '1.07' },
            { x: '20', y: '2.11' }
        ]
    }
];

// Data for exhibit ranking bump chart. x-axis is date, y-axis is rank
const rankingData = [
    {
        id: 'Aretha Franklin',
        data: [
            { x: '14', y: '1' },
            { x: '15', y: '1' },
            { x: '16', y: '1' },
            { x: '17', y: '2' },
            { x: '18', y: '1' },
            { x: '19', y: '2' },
            { x: '20', y: '3' }
        ]
    },
    {
        id: 'James Brown',
        data: [
            { x: '14', y: '2' },
            { x: '15', y: '2' },
            { x: '16', y: '2' },
            { x: '17', y: '3' },
            { x: '18', y: '2' },
            { x: '19', y: '3' },
            { x: '20', y: '2' }
        ]
    },
    {
        id: 'Exhibit 3',
        data: [
            { x: '14', y: '3' },
            { x: '15', y: '3' },
            { x: '16', y: '3' },
            { x: '17', y: '1' },
            { x: '18', y: '3' },
            { x: '19', y: '1' },
            { x: '20', y: '1' }
        ]
    }
];

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

// Hard-coding this until implemented
const dateRange = '9/19 - 9/25';

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
    }
};

export default function Analytics() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const isMobile = useMediaQuery('(max-width: 960px)');
    const isMedium = useMediaQuery('(max-width: 1339px)');

    // State for filters
    const [timeFilter, setTimeFilter] = useState(true);
    const [scansFilter, setScansFilter] = useState(true);
    const [pathingFilter, setPathingFilter] = useState(true);

    // Defines grid for charts
    const Grid = makeResponsive(measureItems(CSSGrid), {
        maxWidth: isMedium ? 700 : 1500,
        minPadding: 100
    });

    return (
        <div>
            <div className={'content'}>
                <div style={{ marginLeft: '30px' }}>
                    <Typography component="h1" variant="h2">
                        ANALYTICS
                    </Typography>
                    <div className={classes.chipDiv}>
                        <div>
                            <IconCalendarStats /> {dateRange}
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
                        <NumericCard styles={cardStyles} data={mockDataNumScans} />
                        <TimeCard styles={cardStyles} data={mockDataTime} />
                        <ExhibitCard styles={cardStyles} data={mockDataExhibit} />
                    </div>
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
                                />
                            </div>
                        )}
                        {scansFilter && (
                            <div key="scansPie">
                                <PieChart
                                    title={'Exhibit Scans Percentage'}
                                    data={scansPieData}
                                    theme={theme}
                                />
                            </div>
                        )}
                        {timeFilter && (
                            <div key="averageTotalTimeLine">
                                <LineGraph
                                    title={'Average Total Time'}
                                    data={avgTimeData}
                                    theme={theme}
                                />
                            </div>
                        )}
                        {scansFilter && (
                            <div key="exhibitRanking">
                                <BumpChart
                                    title={'Exhibit Rank'}
                                    data={rankingData}
                                    theme={theme}
                                />
                            </div>
                        )}
                    </Grid>
                </div>
            </div>
        </div>
    );
}
