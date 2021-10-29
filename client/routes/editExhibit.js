import { Container, Typography } from '@material-ui/core';
import ExhibitForm from './exhibitForm';
import React from 'react';

function EditExhibit() {
    return (
        <>
            <div className="content">
                <Container maxWidth="md">
                    <Typography
                        component="h1"
                        variant="h4"
                        style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        EDIT EXHIBIT
                    </Typography>
                </Container>
            </div>

            <ExhibitForm isEdit={true} />
        </>
    );
}

export default EditExhibit;
