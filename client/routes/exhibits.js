import { Container, IconButton, makeStyles, Menu, MenuItem, Snackbar, Typography, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { IconDotsVertical, IconPlus } from '@tabler/icons';
import ExhibitListItem from '../components/exhibitListItem';
import ExhibitListSkeleton from '../components/exhibitListSkeleton';
import formatDate, { sortDates } from '../util/formatDate';
import getExhibits from '../util/getExhibits';
import MuiAlert from '@material-ui/lab/Alert';
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
    sortHeader: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center'
    },
    mobileListHeader: {
        display: 'grid',
        gridTemplateColumns: '80px 1fr 40px 40px',
        textAlign: 'center',
        paddingBottom: '1rem'
    }
}

export default function Exhibits({
    exhibits,
    setExhibits,
    openSuccess,
    setOpenSuccess,
    snackbarText
}) {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const isMobile = useMediaQuery('(max-width:960px)');

    // Open/close state for sort menu
    const [anchorEl, setAnchorEl] = useState(null);

    const [refreshed, setRefreshed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [noExhibits, setNoExhibits] = useState(false);

    useEffect(() => {
        if (exhibits.length === 0 && !noExhibits) {
            console.log('Exhibits array empty.');
            getExhibits(setExhibits, setRefreshed, setNoExhibits);
            setIsLoading(true);
        } else {
            console.log(exhibits);
            setIsLoading(false);
        }
    }, [refreshed, exhibits, noExhibits]);

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
    };

    // Opens sort menu
    const handleMenuClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = item => {
        setAnchorEl(null);
    };

    // Sorts exhibits by given property
    const sortExhibits = property => {
        switch(property) {
            case 'name':
                exhibits.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0);
                setAnchorEl(null);
                break;
            case 'date':
                exhibits.sort((a, b) => sortDates(a.createdAt, b.createdAt));
                setAnchorEl(null);
                break;
            case 'status':
                exhibits.sort((a, b) => (a.exhibitStatusID > b.exhibitStatusID) ? 1 : (a.exhibitStatusID < b.exhibitStatusID) ? -1 : 0);
                setAnchorEl(null);
                break;
            default:
                break;
        }
    };

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
                                    <div className={classes.sortHeader}>
                                        {!isMobile && <span>Sort By</span>}
                                        <IconButton
                                            size='small'
                                            aria-controls="simple-menu"
                                            aria-haspopup="true"
                                            onClick={handleMenuClick}>
                                            <IconDotsVertical color={'white'} />
                                        </IconButton>
                                        <Menu
                                            keepMounted
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={() => handleMenuClose()}>
                                            <MenuItem onClick={() => sortExhibits('name')}>
                                                <div>
                                                    <span>Name</span>
                                                </div>
                                            </MenuItem>
                                            <MenuItem onClick={() => sortExhibits('date')}>
                                                <div>
                                                    <span>Date</span>
                                                </div>
                                            </MenuItem>
                                            <MenuItem onClick={() => sortExhibits('status')}>
                                                <div>
                                                    <span>Status</span>
                                                </div>
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                    {isMobile && <span>Status</span>}
                                </div>
                                <div>
                                    {isLoading && <ExhibitListSkeleton />}
                                    {!isLoading &&
                                        exhibits.map((exhibit, index) => (
                                            <ExhibitListItem
                                                name={exhibit.name}
                                                date={formatDate(exhibit.createdAt)}
                                                artistImg={exhibit.mainImage}
                                                status={exhibit.exhibitStatusID}
                                                index={index}
                                                id={exhibit.exhibitID}
                                                key={exhibit.exhibitID}
                                                exhibits={exhibits}
                                                setExhibits={setExhibits}
                                            />
                                        ))}
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
                <Snackbar open={openSuccess} autoHideDuration={10000} onClose={handleSuccessClose}>
                    <MuiAlert
                        onClose={handleSuccessClose}
                        severity="success"
                        elevation={4}
                        variant="filled">
                        {snackbarText}
                    </MuiAlert>
                </Snackbar>
            </div>
        </div>
    );
}

Exhibits.propTypes = {
    exhibits: PropTypes.array,
    setExhibits: PropTypes.func,
    openSuccess: PropTypes.bool,
    setOpenSuccess: PropTypes.func,
    snackbarText: PropTypes.string
};
