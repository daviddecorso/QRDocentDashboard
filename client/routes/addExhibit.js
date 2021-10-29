import { Container, Typography } from '@material-ui/core';
import ExhibitForm from './exhibitForm';
import React from 'react';

function AddExhibit() {
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
            <ExhibitForm isAdd={true} apiRoute={''} />
        </>
    );
}

export default AddExhibit;
