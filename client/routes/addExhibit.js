import { Container, Typography } from '@material-ui/core';
import ExhibitForm from './exhibitForm';
import PropTypes from 'prop-types';
import React from 'react';

function AddExhibit({ exhibits, setExhibits, setOpenSuccess, setSnackbarText }) {
    return (
        <>
            <div style={{ marginTop: '40px' }}>
                <Container maxWidth="md">
                    <Typography
                        component="h1"
                        variant="h4"
                        style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        NEW EXHIBIT
                    </Typography>
                </Container>
            </div>
            <ExhibitForm
                isAdd={true}
                exhibits={exhibits}
                setExhibits={setExhibits}
                setOpenSuccess={setOpenSuccess}
                setSnackbarText={setSnackbarText}
            />
        </>
    );
}

AddExhibit.propTypes = {
    exhibits: PropTypes.any,
    setExhibits: PropTypes.any,
    setOpenSuccess: PropTypes.func,
    setSnackbarText: PropTypes.func
};

export default AddExhibit;
