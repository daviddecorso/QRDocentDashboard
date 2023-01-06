import { Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExhibitForm from './exhibitForm';
import MuseumEditForm from './museumEditForm';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

function EditMuseum() {
    

    return (
        <React.Fragment>
            <div style={{ marginTop: '40px' }}>
                <Container maxWidth="md">
                    <Typography
                        component="h1"
                        variant="h4"
                        style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        MAIN MUSEUM PAGE
                    </Typography>
                </Container>
            </div>
            <MuseumEditForm />
        </React.Fragment>
    );
}

// EditExhibit.propTypes = {
//     exhibits: PropTypes.array,
//     setExhibits: PropTypes.func,
//     setOpenSuccess: PropTypes.func,
//     setSnackbarText: PropTypes.func
// };

export default EditMuseum;
