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
    Typography
} from '@material-ui/core';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons';
import React, { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import Status from './status';
import { useHistory } from 'react-router-dom';

const pageStyles = {
    listItemDarkBg: {
        height: '80px',
        display: 'grid',
        gridTemplateColumns: 'minmax(80px, 120px) 1fr 1fr 1fr 1fr',
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
    image: {
        height: '60px',
        width: '60px',
        borderRadius: '50%',
        justifySelf: 'right'
    },
    exhibitName: {
        fontSize: '18px'
    }
};

function ExhibitListItem({ name, date, artistImg, status, index }) {
    // Open/close state for edit/delete menu
    const [anchorEl, setAnchorEl] = useState(null);

    // Open/close state for "are you sure you want to delete" alert dialog
    const [openDeleteAlert, setDeleteAlertOpen] = useState(false);

    // Open/close state for "you have successfully deleted..." snackbar
    const [openDeleteSuccess, setOpenDeleteSuccess] = useState(false);

    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();
    const history = useHistory();

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
            history.push('/exhibits/edit');
        }
        if (item === 'delete') {
            handleAlertOpen();
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

    const handleDelete = () => {
        handleAlertClose();
        handleDeleteSuccessOpen();
    };

    return (
        <>
            <div className={index % 2 === 0 ? classes.listItemLightBg : classes.listItemDarkBg}>
                <img className={classes.image} src={artistImg} alt={`Picture of ${name}`} />
                <p className={classes.exhibitName}>{name}</p>
                <Typography component="span" variant="body1">
                    {date}
                </Typography>
                <div>
                    <Status status={status} />
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
                        QR code will no longer work. If you want to reuse this exhibit&apos;s QR
                        code for another purpose, please edit the exhibit information instead.
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
    status: PropTypes.number
};

export default ExhibitListItem;