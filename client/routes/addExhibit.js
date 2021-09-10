import { Container, Typography } from '@material-ui/core';
import ExhibitForm from './exhibitForm';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function AddExhibit() {
    // Creates UUID to serve as the exhibit's ID.
    const exhibitId = uuidv4();

    // Production URL (change to config variable)
    const mockData = {
        url: 'qrdocent.com/qr/'
    };

    // Route to the API that generates a QR code (change to config variable)
    const apiRoute =
        'https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=' + mockData.url + exhibitId;

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

            <ExhibitForm apiRoute={apiRoute} />
        </>
    );
}

export default AddExhibit;
