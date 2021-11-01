import { Container, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExhibitListItem from '../components/exhibitListItem';
import formatDate from '../util/formatDate';
import getExhibits from '../util/getExhibits';
import { IconPlus } from '@tabler/icons';
import PrimaryButton from '../components/buttons/primary-button';
import PropTypes from 'prop-types';

const pageStyles = {
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    mobileHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& button': {
            marginTop: '1rem'
        }
    },
    listContainer: {
        backgroundColor: '#2F333C',
        border: 'grey 1px solid',
        borderRadius: '10px',
        marginTop: '2rem',
        paddingTop: '1rem'
    },
    listHeader: {
        display: 'grid',
        gridTemplateColumns: '120px 1fr 1fr 1fr 1fr',
        textAlign: 'center',
        paddingBottom: '1rem'
    },
    mobileListHeader: {
        display: 'grid',
        gridTemplateColumns: '80px 1fr 40px 40px',
        textAlign: 'center',
        paddingBottom: '1rem'
    }
};

export default function Exhibits({ exhibits, setExhibits }) {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const isMobile = useMediaQuery('(max-width:960px)');

    const [refreshed, setRefreshed] = useState(false);

    useEffect(() => {
        if (exhibits.length === 0) {
            console.log('Exhibits array empty.');
            getExhibits(setExhibits, setRefreshed);
        } else {
            console.log(exhibits);
        }
    }, [refreshed]);

    return (
        <div>
            <div className={'content'}>
                <div className={'left-spacing'}>
                    <div className={isMobile ? classes.mobileHeader : classes.header}>
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
                                <div
                                    className={
                                        isMobile ? classes.mobileListHeader : classes.listHeader
                                    }>
                                    <span></span>
                                    <span>Exhibit Name</span>
                                    {!isMobile && <span>Date Created</span>}
                                    {!isMobile && <span>QR Code Status</span>}
                                    {isMobile && <span>Status</span>}
                                </div>
                                <div>
                                    {exhibits.map((exhibit, index) => (
                                        <ExhibitListItem
                                            name={exhibit.name}
                                            date={formatDate(exhibit.createdAt)}
                                            artistImg={exhibit.mainImage}
                                            status={exhibit.exhibitStatusID}
                                            index={index}
                                            id={exhibit.exhibitID}
                                            key={exhibit.exhibitID}
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

Exhibits.propTypes = {
    exhibits: PropTypes.shape({
        length: PropTypes.number,
        map: PropTypes.func
    }),
    setExhibits: PropTypes.func
};
