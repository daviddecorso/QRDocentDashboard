import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Snackbar,
    Typography,
    useMediaQuery
} from '@material-ui/core';
import { IconDotsVertical, IconPencil, IconPrinter, IconTrash } from '@tabler/icons';
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { getBaseURL } from '../../configuration';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import Status from './status';

const pageStyles = {
    listItemDarkBg: {
        height: '80px',
        display: 'grid',
        gridTemplateColumns: '120px 1fr 1fr 1fr 1fr',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: '#2F333C'
    },
    listItemLightBg: {
        height: '80px',
        display: 'grid',
        gridTemplateColumns: '120px 1fr 1fr 1fr 1fr',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: '#343842'
    },
    mobileListItemDarkBg: {
        height: '80px',
        display: 'grid',
        gridTemplateColumns: '80px 1fr 40px 40px',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: '#2F333C'
    },
    mobileListItemLightBg: {
        height: '80px',
        display: 'grid',
        gridTemplateColumns: '80px 1fr 40px 40px',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: '#343842'
    },
    image: {
        height: '60px',
        width: '60px',
        borderRadius: '50%',
        justifySelf: 'right',
        objectFit: 'cover'
    },
    mobileImage: {
        height: '60px',
        width: '60px',
        borderRadius: '50%',
        justifySelf: 'center'
    },
    exhibitName: {
        fontSize: '18px'
    },
    exhibitLink: {
        color: 'white'
    }
};

function ExhibitListItem({ name, date, artistImg, status, index, id, exhibits, setExhibits }) {
    // Open/close state for edit/delete menu
    const [anchorEl, setAnchorEl] = useState(null);

    // Open/close state for "are you sure you want to delete" alert dialog
    const [openDeleteAlert, setDeleteAlertOpen] = useState(false);

    // Open/close state for "you have successfully deleted..." snackbar
    const [openDeleteSuccess, setOpenDeleteSuccess] = useState(false);

    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();
    const history = useHistory();

    const isMobile = useMediaQuery('(max-width:960px)');

    // Opens alert dialog
    const handleAlertOpen = () => {
        setDeleteAlertOpen(true);
    };

    // Closes alert dialog
    const handleAlertClose = () => {
        setDeleteAlertOpen(false);
    };

    // Opens edit/delete menu
    const handleMenuClick = event => {
        setAnchorEl(event.currentTarget);
    };

    // Handles edit/delete menu actions
    const handleMenuClose = item => {
        setAnchorEl(null);
        if (item === 'edit') {
            history.push('/exhibits/edit/' + id);
        }
        if (item === 'delete') {
            handleAlertOpen();
        }
        if (item === 'print') {
            window.location.assign(
                'https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=' +
                    getBaseURL() +
                    'qr/' +
                    id
            );
        }
    };

    const handleDeleteSuccessOpen = () => {
        setOpenDeleteSuccess(true);
    };

    const handleDeleteSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDeleteSuccess(false);
    };

    const removeExhibit = () => {
        const tempArr = exhibits;
        tempArr.splice(Number(index), 1);
        setExhibits(tempArr);

        // Scuffed fix until I fix removing the exhibit from the exhibits state.
        history.push('/exhibits/');
    };

    const handleDelete = () => {
        handleAlertClose();
        axios
            .post(
                getBaseURL() + 'api/deleteMuseumExhibit',
                { exhibitID: Number(id) },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                }
            )
            .then(res => {
                if (res.data.success) {
                    console.log(res);
                    console.log(id);

                    handleDeleteSuccessOpen();
                    removeExhibit();
                } else {
                    console.log('We need to refresh!');
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
                                    .post(getBaseURL() + 'api/deleteMuseumExhibit', Number(id), {
                                        headers: {
                                            Authorization:
                                                'Bearer ' + tokenRes.data.result.accessToken
                                        }
                                    })
                                    .then(result => {
                                        if (result.data.success) {
                                            console.log(result);
                                            console.log(id);
                                            removeExhibit();
                                            handleDeleteSuccessOpen();
                                        } else {
                                            console.log(
                                                'Not able to delete exhibit after a refresh.'
                                            );
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
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
            })
            .catch(err => {
                console.log(err);
            });
    };

    // Get correct style
    let style;
    if (index % 2 === 0) {
        isMobile ? (style = classes.mobileListItemLightBg) : (style = classes.listItemLightBg);
    } else {
        isMobile ? (style = classes.mobileListItemDarkBg) : (style = classes.listItemDarkBg);
    }

    return (
        <>
            <div className={style}>
                <img
                    className={isMobile ? classes.mobileImage : classes.image}
                    src={artistImg}
                    alt={`Picture of ${name}`}
                />
                <Link to={'/exhibits/edit/' + id} className={classes.exhibitLink}>
                    <p className={classes.exhibitName}>{name}</p>
                </Link>
                {!isMobile && (
                    <Typography component="span" variant="body1">
                        {date}
                    </Typography>
                )}

                <div>
                    <Status status={status} isMobile={isMobile} />
                </div>
                <div>
                    <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleMenuClick}>
                        <IconDotsVertical color={'white'} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => handleMenuClose()}>
                        <MenuItem onClick={() => handleMenuClose('edit')}>
                            <div>
                                <IconPencil /> <span>Edit</span>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuClose('print')}>
                            <div>
                                <IconPrinter /> <span>Print</span>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuClose('delete')}>
                            <div>
                                <IconTrash /> <span>Delete</span>
                            </div>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <Dialog
                open={openDeleteAlert}
                onClose={handleAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Delete this exhibit?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting will remove this exhibit and all its contents. This exhibit&apos;s
                        QR code will no longer work, analytics data related to this exhibit will be
                        deleted, and this exhibit will be removed from users&apos; scans lists on
                        the app. (Exhibits should not be deleted just because they are no longer in
                        use.)
                        <br />
                        <br /> This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openDeleteSuccess}
                autoHideDuration={4000}
                onClose={handleDeleteSuccessClose}>
                <MuiAlert
                    onClose={handleDeleteSuccessClose}
                    severity="success"
                    elevation={4}
                    variant="filled">
                    Exhibit successfully deleted.
                </MuiAlert>
            </Snackbar>
        </>
    );
}

ExhibitListItem.propTypes = {
    artistImg: PropTypes.string,
    date: PropTypes.string,
    index: PropTypes.number,
    name: PropTypes.string,
    status: PropTypes.number,
    id: PropTypes.any,
    exhibits: PropTypes.any,
    setExhibits: PropTypes.func
};

export default ExhibitListItem;
