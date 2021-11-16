import { makeStyles, useMediaQuery } from '@material-ui/core';
import ExhibitCard from '../components/analyticsCards/exhibit-card';
import NumericCard from '../components/analyticsCards/numeric-card';
import PrimaryButton from '../components/buttons/primary-button';
import React from 'react';
import TimeCard from '../components/analyticsCards/time-card';

// CSS styles for the cards
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
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr'
    },
    mobileCardLayout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& div': {
            marginBottom: '.5rem'
        }
    },
    headingStyle: {
        marginTop: '10vh',
        fontSize: '68px',
        fontWeight: '200',
        marginBottom: '1.7rem'
    },
    mobileHeadingStyle: {
        marginTop: '5vh',
        fontSize: '44px',
        fontWeight: '200',
        marginBottom: '1.7rem',
        textAlign: 'center'
    },
    buttonDivStyle: {
        marginBottom: '1.7rem'
    },
    buttonDivStyleMobile: {
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& button': {
            marginBottom: '1rem'
        }
    }
};

// Replace mock data with real data from db
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

export default function Index() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const isMobile = useMediaQuery('(max-width:960px)');

    return (
        <div className={'content'}>
            <div className={'left-spacing'}>
                <h2 className={isMobile ? classes.mobileHeadingStyle : classes.headingStyle}>
                    Welcome Back!
                </h2>
                <div className={isMobile ? classes.buttonDivStyleMobile : classes.buttonDivStyle}>
                    <PrimaryButton
                        text={'View my exhibits'}
                        path={'/exhibits'}
                        width={'200px'}
                        height={'45px'}
                        fontSize={'14px'}
                        rm={isMobile ? '0' : '30px'}
                    />
                    <PrimaryButton
                        text={'Add an exhibit'}
                        path={'/exhibits/add'}
                        width={'200px'}
                        height={'45px'}
                        fontSize={'14px'}
                    />
                </div>
                <div className={isMobile ? classes.mobileCardLayout : classes.cardLayoutDesktop}>
                    <NumericCard styles={cardStyles} data={mockDataNumScans} />
                    <TimeCard styles={cardStyles} data={mockDataTime} />
                    <ExhibitCard styles={cardStyles} data={mockDataExhibit} />
                </div>
            </div>
        </div>
    );
}
