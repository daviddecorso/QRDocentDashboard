import { Container, Typography } from '@material-ui/core';
import MuseumEditForm from './museumEditForm';
import React from 'react';

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
export default EditMuseum;