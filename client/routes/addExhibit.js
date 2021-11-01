import { Container, Typography } from '@material-ui/core';
import ExhibitForm from './exhibitForm';
import PropTypes from 'prop-types';
import React from 'react';

function AddExhibit({ exhibits, setExhibits }) {
    return (
        <>
            <div className="content">
                <Container maxWidth="md">
                    <Typography
                        component="h1"
                        variant="h4"
                        style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        NEW EXHIBIT
                    </Typography>
                </Container>
            </div>
            <ExhibitForm isAdd={true} exhibits={exhibits} setExhibits={setExhibits} />
        </>
    );
}

AddExhibit.propTypes = {
    exhibits: PropTypes.any,
    setExhibits: PropTypes.any
};

export default AddExhibit;
