import { Container, FormControl, makeStyles, TextField, Typography } from '@material-ui/core';
import { IconDeviceFloppy, IconHelp, IconPrinter, IconX } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import PrimaryButton from '../components/buttons/primary-button';
import PropTypes from 'prop-types';
import SuccessButton from '../components/buttons/success-button';
import WarningButton from '../components/buttons/warning-button';
import 'microtip/microtip.css';

const pageStyles = {
    pageTitle: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
    formContainer: {
        backgroundColor: '#2F333C',
        border: 'grey 1px solid',
        padding: '2rem',
        borderRadius: '10px'
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
    }
};

// Tooltip content
const tooltipText = {
    bio: 'This is the biography tooltip.',
    video: 'This is the video tooltip',
    song: 'This is the song tooltip',
    website: 'This is the website tooltip',
    image: 'This is the image tooltip'
};

function ExhibitForm({
    apiRoute,
    nameInputText,
    bioInputText,
    videoInputText,
    songInputText,
    websiteInputText,
    imageInputText
}) {
    // State for showing error when exhibit name is left empty
    const [noNameError, setBioError] = useState(false);

    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    useEffect(() => {
        // Fills form with props if they exist
        const nameInput = document.getElementById('name-input');
        if (nameInputText) {
            nameInput.value = nameInputText;
        }

        const bioInput = document.getElementById('bio-input');
        if (bioInputText) {
            bioInput.value = bioInputText;
        }

        const videoInput = document.getElementById('video-input');
        if (videoInputText) {
            videoInput.value = videoInputText;
        }

        const songInput = document.getElementById('song-input');
        if (songInputText) {
            songInput.value = songInputText;
        }

        const websiteInput = document.getElementById('website-input');
        if (websiteInputText) {
            websiteInput.value = websiteInputText;
        }

        const imageInput = document.getElementById('image-input');
        if (imageInputText) {
            imageInput.value = imageInputText;
        }
    });

    // Save exhibit
    const onClickSave = () => {
        const nameInputValue = document.getElementById('name-input').value;

        // Errors if exhibit name is empty.
        setBioError(!nameInputValue);
    };

    return (
        <div className={'content'}>
            <Container maxWidth="md">
                <Typography component="h1" variant="h4" className={classes.pageTitle}>
                    NEW EXHIBIT
                </Typography>
                <div className={classes.formContainer}>
                    <div className={classes.formHeader}>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField
                                label="Exhibit name"
                                id="name-input"
                                required
                                variant="outlined"
                                error={noNameError}
                                helperText={noNameError ? 'Field required.' : ''}
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
                    <div className={classes.formInput}>
                        <TextField
                            label="Biography"
                            id="bio-input"
                            multiline
                            fullWidth
                            variant="outlined"
                        />
                        <span
                            tabIndex="0"
                            aria-label={tooltipText.bio}
                            role="tooltip"
                            data-microtip-position="top"
                            className={classes.formIcon}>
                            <IconHelp color={'white'} />
                        </span>
                    </div>
                    <div className={classes.formInput}>
                        <TextField
                            label="Video Link"
                            id="video-input"
                            fullWidth
                            variant="outlined"
                        />
                        <span
                            tabIndex="0"
                            aria-label={tooltipText.video}
                            role="tooltip"
                            data-microtip-position="top"
                            className={classes.formIcon}>
                            <IconHelp color={'white'} />
                        </span>
                    </div>
                    <div className={classes.formInput}>
                        <TextField label="Song Link" id="song-input" fullWidth variant="outlined" />
                        <span
                            tabIndex="0"
                            aria-label={tooltipText.song}
                            role="tooltip"
                            data-microtip-position="top"
                            className={classes.formIcon}>
                            <IconHelp color={'white'} />
                        </span>
                    </div>
                    <div className={classes.formInput}>
                        <TextField
                            label="Website Link"
                            id="website-input"
                            fullWidth
                            variant="outlined"
                        />
                        <span
                            tabIndex="0"
                            aria-label={tooltipText.website}
                            role="tooltip"
                            data-microtip-position="top"
                            className={classes.formIcon}>
                            <IconHelp color={'white'} />
                        </span>
                    </div>
                    <div className={classes.formInput}>
                        <TextField
                            label="Image Link"
                            id="image-input"
                            fullWidth
                            variant="outlined"
                        />
                        <span
                            tabIndex="0"
                            aria-label={tooltipText.image}
                            role="tooltip"
                            data-microtip-position="top"
                            className={classes.formIcon}>
                            <IconHelp color={'white'} />
                        </span>
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
                            onClick={onClickSave}
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}

ExhibitForm.propTypes = {
    apiRoute: PropTypes.string,
    bioInputText: PropTypes.string,
    imageInputText: PropTypes.string,
    nameInputText: PropTypes.string,
    songInputText: PropTypes.string,
    videoInputText: PropTypes.string,
    websiteInputText: PropTypes.string
};

export default ExhibitForm;
