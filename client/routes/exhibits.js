import { Container, makeStyles, Typography } from '@material-ui/core';
import ExhibitListItem from '../components/exhibitListItem';
import { IconPlus } from '@tabler/icons';
import PrimaryButton from '../components/buttons/primary-button';
import React from 'react';

const pageStyles = {
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    listContainer: {
        backgroundColor: '#2F333C',
        border: 'grey 1px solid',
        borderRadius: '10px',
        marginTop: '2rem',
        paddingTop: '1rem',
        paddingBottom: '2rem'
    },
    listHeader: {
        display: 'grid',
        gridTemplateColumns: '120px 1fr 1fr 1fr 1fr',
        textAlign: 'center',
        paddingBottom: '1rem'
    }
};

// Mock exhibit data
const mockData = [
    {
        name: 'Aretha Franklin',
        date: '7/21/21',
        artistImg: 'https://i.scdn.co/image/ab6761610000f178f12270128127ba170f90097d',
        status: 0
    },
    {
        name: 'James Brown',
        date: '7/31/21',
        artistImg: 'https://i.scdn.co/image/8590cf083b8ab7c1e13128e6f306a879e47ae49c',
        status: 1
    },
    {
        name: 'The Temptations',
        date: '8/12/21',
        artistImg: 'https://i.scdn.co/image/ab6761610000f1783f0f76df1047720f2e57fc35',
        status: 2
    }
];

export default function Exhibits() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    return (
        <div>
            <div className={'content'}>
                <div className={'left-spacing'}>
                    <div className={classes.header}>
                        <Typography component="h1" variant="h2">
                            EXHIBITS
                        </Typography>
                        <div>
                            <PrimaryButton
                                path={'/exhibits/add'}
                                text={'Add an exhibit'}
                                width={'210px'}
                                height={'45px'}
                                fontSize={'14px'}
                                lm={'5vw'}
                                icon={<IconPlus size={20} />}
                            />
                        </div>
                    </div>
                    <div>
                        <Container maxWidth="lg">
                            <div className={classes.listContainer}>
                                <div className={classes.listHeader}>
                                    <span></span>
                                    <span>Exhibit Name</span>
                                    <span>Date Created</span>
                                    <span>QR Code Status</span>
                                </div>
                                <div>
                                    {mockData.map((exhibit, index) => (
                                        <ExhibitListItem
                                            name={exhibit.name}
                                            date={exhibit.date}
                                            artistImg={exhibit.artistImg}
                                            status={exhibit.status}
                                            index={index}
                                            key={exhibit.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
}
