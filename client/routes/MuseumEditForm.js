import { FormControl, makeStyles, TextField, Typography, useMediaQuery } from '@material-ui/core';
import { IconHelp, IconUpload, IconDeviceFloppy } from '@tabler/icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SuccessButton from '../components/buttons/success-button';
import UploadButton from '../components/buttons/upload-button';

const pageStyles = {
    content: {
        display: 'flex',
        justifyContent: 'center'
    },
    pageTitle: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
    formContainer: {
        backgroundColor: '#2F333C',
        border: 'grey 1px solid',
        padding: '2rem',
        borderRadius: '10px',
        width: '45vw'
    },
    formHeader: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    formInput: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2rem',
        marginTop: '2rem'
    },
    formIcon: {
        marginLeft: '1rem'
    },
    buttons: {
        textAlign: 'center',
        marginTop: '2rem'
    },
    container: {
        display: 'flex',
        marginLeft: '4%'
    },
    previewContainer: {
        marginLeft: '4%'
    },
    cardList: {
        backgroundColor: '#2F333C',
        borderRadius: '20px'
    },
    mobileButtons: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    mobilePrintButton: {
        textAlign: 'center',
        marginTop: '1rem'
    },
    cardButton: {
        height: '60px',
        width: '187px',
        backgroundColor: '#2F333C',
        marginBottom: '1rem',
        fontSize: '16px'
    },
    cardButtonHighlight: {
        height: '60px',
        width: '187px',
        backgroundColor: '#343842',
        marginBottom: '1rem',
        fontSize: '16px'
    },
    backButtonDiv: {
        position: 'absolute',
        left: '50px',
        top: '50px'
    }
};

// Tooltip content
const tooltipText = {
    about: 'The about field will display long-form text describing the nature of the museum.'
};

function MuseumEditForm() {
    // Styling Init
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const isMobile = useMediaQuery('(max-width:960px)');
    const isSmallMobile = useMediaQuery('(max-width:410px)');

    // Error States
    const [noNameError, setNameError] = useState(false);

    // Form Value States
    const [museumName, setMuseumName] = useState('');
    const [aboutDescription, setAboutDescription] = useState('');
    const [backgroundImageUpload, setBackgroundImageUpload] = useState();

    // Handlers
    const handleUploadChange = event => {
        const newImage = event.target.files[0];
        setBackgroundImageUpload(newImage);
    };

    const onClickSave = () => {
        return;
    };

    return (
        <>
            <div className={classes.content}>
                <div className={classes.container}>
                    <div className={classes.formContainer}>
                        <div className={classes.formHeader}>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    label="Museum Name"
                                    id="name-input"
                                    required
                                    variant="outlined"
                                    onChange={e => setMuseumName(e.target.value)}
                                    error={noNameError}
                                    helperText={noNameError ? 'Field required.' : ''}
                                />
                            </FormControl>
                        </div>
                        <div className={classes.formInput}>
                            <TextField
                                label="About"
                                id="about-input"
                                multiline
                                fullWidth
                                onChange={e => setAboutDescription(e.target.value)}
                                variant="outlined"
                            />
                            <span
                                tabIndex="0"
                                aria-label={tooltipText.about}
                                role="tooltip"
                                data-microtip-position={isMobile ? 'top-left' : 'top'}
                                className={classes.formIcon}>
                                <IconHelp color={'white'} />
                            </span>
                        </div>
                        <div className={classes.formInput}>
                            <UploadButton
                                width={'325px'}
                                height={'46px'}
                                rm={'10px'}
                                fontSize={'15px'}
                                text={'Upload Background Image'}
                                icon={<IconUpload/>}
                                onChange={handleUploadChange}/>
                            { backgroundImageUpload !== undefined
                                ? <Typography variant="h6"> {backgroundImageUpload.name} </Typography>
                                : null }
                        </div>

                        <div className={classes.buttons}>
                            <SuccessButton
                                text={'SAVE'}
                                width={'150px'}
                                lm={isSmallMobile ? '0' : '2rem'}
                                icon={<IconDeviceFloppy />}
                                onClick={onClickSave}
                                isMobile={isSmallMobile}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MuseumEditForm;