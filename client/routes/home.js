import ExhibitCard from '../components/cards/exhibit-card';
import NumericCard from '../components/cards/numeric-card';
import PrimaryButton from '../components/buttons/primary-button';
import React from 'react';
import TimeCard from '../components/cards/time-card';

// CSS styles for the cards
const cardStyles = {
    root: {
        width: '328px',
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
    return (
        <div className={'content'}>
            <div className={'left-spacing'}>
                <h2
                    style={{
                        marginTop: '10vh',
                        fontSize: '68px',
                        fontWeight: '200',
                        marginBottom: '1.7rem'
                    }}>
                    Welcome Back!
                </h2>
                <div style={{ marginBottom: '1.7rem' }}>
                    <PrimaryButton
                        text={'View my exhibits'}
                        path={'/exhibits'}
                        width={'200px'}
                        height={'45px'}
                        fontSize={'14px'}
                        rm={'30px'}
                    />
                    <PrimaryButton
                        text={'Add an exhibit'}
                        path={'/exhibits/add'}
                        width={'200px'}
                        height={'45px'}
                        fontSize={'14px'}
                    />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <NumericCard styles={cardStyles} data={mockDataNumScans} />
                    <TimeCard styles={cardStyles} data={mockDataTime} />
                    <ExhibitCard styles={cardStyles} data={mockDataExhibit} />
                </div>
            </div>
        </div>
    );
}
