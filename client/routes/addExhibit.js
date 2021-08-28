import { Container, FormControl, makeStyles, TextField, Typography } from '@material-ui/core';
import { IconDeviceFloppy, IconPrinter, IconX } from '@tabler/icons';
import PrimaryButton from '../components/buttons/primary-button';
import React from 'react';
import SuccessButton from '../components/buttons/success-button';
import { v4 as uuidv4 } from 'uuid';
import WarningButton from '../components/buttons/warning-button';

const pageStyles = {
    formContainer: {
        backgroundColor: '#2F333C',
        border: 'grey 1px solid',
        padding: '2rem',
        borderRadius: '10px'
    },
    formHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '2rem'
    },
    buttons: {
        textAlign: 'center',
        marginTop: '2rem'
    }
};

const mockData = {
    museumID: '1000002',
    url: 'qrdocent.com/qr/'
};

function AddExhibit() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const exhibitId = uuidv4();

    const apiRoute =
        'https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=' +
        mockData.url +
        mockData.museumID +
        '/' +
        exhibitId;

    return (
        <div className={'content'}>
            <Container maxWidth="md">
                <Typography
                    component="h1"
                    variant="h4"
                    style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    NEW EXHIBIT
                </Typography>
                <div className={classes.formContainer}>
                    <div className={classes.formHeader}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField
                                id="exhibit-name"
                                required
                                variant="outlined"
                                label="Exhibit name"
                            />
                        </FormControl>
                        <a href={apiRoute} style={{ textDecoration: 'none' }}>
                            <PrimaryButton
                                text={'PRINT QR'}
                                width={'200px'}
                                height={'50px'}
                                lm={'1rem'}
                                icon={<IconPrinter size={22} />}
                            />
                        </a>
                    </div>
                    <div>
                        <TextField multiline fullWidth variant="outlined" label="Biography" />
                    </div>
                    <div className={classes.buttons}>
                        <WarningButton
                            text={'CANCEL'}
                            width={'140px'}
                            path={'/exhibits'}
                            icon={<IconX />}
                        />
                        <SuccessButton
                            text={'SAVE'}
                            width={'140px'}
                            lm={'2rem'}
                            icon={<IconDeviceFloppy />}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default AddExhibit;
