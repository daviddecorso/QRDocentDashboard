import {
    FormControl,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';
import { IconDeviceFloppy, IconHelp, IconPlus, IconPrinter, IconX } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExhibitList from '../components/buttons/exhibit-list-button';
import { getBaseURL } from '../../configuration';
import isURL from 'validator/es/lib/isURL';
import PrimaryButton from '../components/buttons/primary-button';
import PropTypes from 'prop-types';
import refreshToken from '../util/refresh';
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
        borderRadius: '10px',
        width: '60%'
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
    container: { display: 'flex', marginLeft: '4%' },
    previewContainer: { marginLeft: '4%' },
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

const getContentTypeFromId = id => {
    switch (id) {
        case 1:
            return 'Image';
        case 2:
            return 'Video';
        case 3:
            return 'Song';
        default:
            return 'Website';
    }
};

const getContentTypeId = type => {
    switch (type) {
        case 'Image':
            return 1;
        case 'Video':
            return 2;
        case 'Song':
            return 3;
        default:
            return 4;
    }
};

function ExhibitForm({ isAdd, isEdit, id, exhibit }) {
    // State for showing active card in card list
    const [activeButton, setActiveButton] = useState(1);

    // State for storing content array
    const [contentArr, setContentArr] = useState([]);

    // State for active card type
    const [cardType, setCardType] = useState('Song');

    // State for showing error when exhibit name is left empty
    const [noNameError, setNameError] = useState(false);
    const [songLinkErr, setSongLinkErr] = useState(false);
    const [videoLinkErr, setVideoLinkErr] = useState(false);
    const [imageLinkErr, setImageLinkErr] = useState(false);
    const [websiteLinkErr, setWebsiteLinkErr] = useState(false);
    const [errText, setErrText] = useState('');

    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const isMobile = useMediaQuery('(max-width:960px)');
    const isSmallMobile = useMediaQuery('(max-width:410px)');

    const apiRoute =
        'https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=' +
        getBaseURL() +
        'qr/' +
        id;

    useEffect(() => {
        if (isEdit) {
            if (exhibit !== null) {
                setCardType(getContentTypeFromId(exhibit.contents[0].contentTypeID));
                setContentArr(exhibit.contents);
                document.getElementById('name-input').value = exhibit.name;
                document.getElementById('bio-input').value = exhibit.description;

                // getContentTypeFromId(exhibit.contents[0].contentTypeID).toLowerCase() + '-input'
                document.getElementById(cardType.toLowerCase() + '-input').value =
                    exhibit.contents[0].URL;
                document.getElementById('description-input').value =
                    exhibit.contents[0].description;
            }
        }
    }, [exhibit]);

    /* const getPreviewFormText = () => {
        contentArr.forEach(card => {
            if (card.position === activeButton) {
                // Set form contents here.
            }
        });
    }; */

    const validateInput = () => {
        const input = document.getElementById(cardType.toLowerCase() + '-input').value;
        let error = false;

        if (input === '') {
            setErrText('Field must not be empty.');
            error = true;
        }

        if (!isURL(input)) {
            setErrText('Must be a valid URL.');
            error = true;
        }

        if (error) {
            switch (cardType) {
                case 'Image':
                    setImageLinkErr(true);
                    break;
                case 'Video':
                    setVideoLinkErr(true);
                    break;
                case 'Song':
                    setSongLinkErr(true);
                    break;
                default:
                    setWebsiteLinkErr(true);
                    break;
            }
            return false;
        }

        setErrText('');
        return true;
    };

    // Adds a card to content array
    const addCard = () => {
        const tempArr = contentArr;
        if (!validateInput()) {
            return false;
        }

        const newCard = {
            URL: document.getElementById(cardType.toLowerCase() + '-input').value,
            description: document.getElementById('description-input').value,
            position: tempArr.length + 1,
            contentTypeID: getContentTypeId(cardType)
        };

        tempArr.push(newCard);
        setContentArr(tempArr);

        console.log(contentArr);
    };

    // Save exhibit
    const onClickSave = () => {
        // Errors if exhibit name is empty.
        setNameError(!document.getElementById('name-input').value);
        if (noNameError) {
            return false;
        }

        const newExhibit = {
            name: document.getElementById('name-input').value,
            description: document.getElementById('bio-input').value,
            contents: contentArr
        };
        if (isAdd) {
            axios
                .post(getBaseURL() + '/api/createMuseumExhibit', newExhibit, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
                .then(res => {
                    console.log(res);
                    if (!res.data.success) {
                        if (res.data.message === 'jwt expired') {
                            console.log('JWT EXPIRED!');
                            refreshToken.then(
                                axios
                                    .post(getBaseURL() + '/api/createMuseumExhibit', newExhibit, {
                                        headers: {
                                            Authorization:
                                                'Bearer ' + localStorage.getItem('accessToken')
                                        }
                                    })
                                    .then(result => {
                                        console.log(result);

                                        // success!
                                    })
                                    .catch(err => {
                                        // error!!
                                        console.log(err);
                                    })
                            );
                        }
                    } else {
                        // success message
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const handleSelectChange = event => {
        setCardType(event.target.value);
    };

    return (
        <div className={'content'}>
            <div className={classes.container}>
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
                        {!isMobile && !isAdd && (
                            <a href={apiRoute} style={{ textDecoration: 'none' }}>
                                <PrimaryButton
                                    text={'PRINT QR'}
                                    width={'200px'}
                                    height={'50px'}
                                    lm={'1rem'}
                                    icon={<IconPrinter size={22} />}
                                />
                            </a>
                        )}
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
                            data-microtip-position={isMobile ? 'top-left' : 'top'}
                            className={classes.formIcon}>
                            <IconHelp color={'white'} />
                        </span>
                    </div>
                    <div className={classes.formInput}>
                        <Typography component={'span'} variant={'h6'}>
                            Card Type:
                        </Typography>
                        <Select
                            id="card-select"
                            label={'Card Type'}
                            value={cardType}
                            onChange={handleSelectChange}
                            style={{ marginLeft: '1rem' }}>
                            <MenuItem value={'Video'}>Video</MenuItem>
                            <MenuItem value={'Song'}>Song</MenuItem>
                            <MenuItem value={'Website'}>Website</MenuItem>
                            <MenuItem value={'Image'}>Image</MenuItem>
                        </Select>
                        <div style={{ textAlign: 'center' }}>
                            <PrimaryButton
                                text={'ADD CARD'}
                                width={'170px'}
                                height={'40px'}
                                fontSize={'14px'}
                                lm={'1rem'}
                                onClick={addCard}
                                icon={<IconPlus size={22} />}
                            />
                        </div>
                    </div>
                    {cardType === 'Video' && (
                        <div className={classes.formInput}>
                            <TextField
                                label="Video Link"
                                id="video-input"
                                fullWidth
                                variant="outlined"
                                error={videoLinkErr}
                                helperText={errText}
                            />
                            <span
                                tabIndex="0"
                                aria-label={tooltipText.video}
                                role="tooltip"
                                data-microtip-position={isMobile ? 'top-left' : 'top'}
                                className={classes.formIcon}>
                                <IconHelp color={'white'} />
                            </span>
                        </div>
                    )}
                    {cardType === 'Song' && (
                        <div className={classes.formInput}>
                            <TextField
                                label="Song Link"
                                id="song-input"
                                fullWidth
                                variant="outlined"
                                error={songLinkErr}
                                helperText={errText}
                            />
                            <span
                                tabIndex="0"
                                aria-label={tooltipText.song}
                                role="tooltip"
                                data-microtip-position={isMobile ? 'top-left' : 'top'}
                                className={classes.formIcon}>
                                <IconHelp color={'white'} />
                            </span>
                        </div>
                    )}
                    {cardType === 'Website' && (
                        <div className={classes.formInput}>
                            <TextField
                                label="Website Link"
                                id="website-input"
                                fullWidth
                                variant="outlined"
                                error={websiteLinkErr}
                                helperText={errText}
                            />
                            <span
                                tabIndex="0"
                                aria-label={tooltipText.website}
                                role="tooltip"
                                data-microtip-position={isMobile ? 'top-left' : 'top'}
                                className={classes.formIcon}>
                                <IconHelp color={'white'} />
                            </span>
                        </div>
                    )}
                    {cardType === 'Image' && (
                        <div className={classes.formInput}>
                            <TextField
                                label="Image Link"
                                id="image-input"
                                fullWidth
                                variant="outlined"
                                error={imageLinkErr}
                                helperText={errText}
                            />
                            <span
                                tabIndex="0"
                                aria-label={tooltipText.image}
                                role="tooltip"
                                data-microtip-position={isMobile ? 'top-left' : 'top'}
                                className={classes.formIcon}>
                                <IconHelp color={'white'} />
                            </span>
                        </div>
                    )}
                    {cardType !== '' && (
                        <>
                            <div className={classes.formInput}>
                                <TextField
                                    label={cardType + ' Description'}
                                    id="description-input"
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                        </>
                    )}
                    {isMobile && (
                        <div className={classes.mobilePrintButton}>
                            <a href={apiRoute} style={{ textDecoration: 'none' }}>
                                <PrimaryButton
                                    text={'PRINT QR'}
                                    width={'200px'}
                                    height={'50px'}
                                    icon={<IconPrinter size={22} />}
                                />
                            </a>
                        </div>
                    )}
                    <div className={classes.buttons}>
                        <WarningButton
                            text={'CANCEL'}
                            width={'140px'}
                            rm={isSmallMobile ? '5rem' : '0'}
                            path={'/exhibits'}
                            icon={<IconX />}
                            isMobile={isSmallMobile}
                        />
                        <SuccessButton
                            text={'SAVE'}
                            width={'140px'}
                            lm={isSmallMobile ? '0' : '2rem'}
                            icon={<IconDeviceFloppy />}
                            onClick={onClickSave}
                            isMobile={isSmallMobile}
                        />
                    </div>
                </div>
                <div className={classes.previewContainer}>
                    <div className={classes.cardList}>
                        {contentArr.map(contents => (
                            <ExhibitList
                                key={contents.URL}
                                position={contents.position}
                                contentId={contents.contentTypeID}
                                activeButton={activeButton}
                                setActive={setActiveButton}
                                content={contentArr}
                                setContent={setContentArr}
                                contentType={getContentTypeFromId}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

ExhibitForm.propTypes = {
    exhibit: PropTypes.shape({
        contents: PropTypes.any,
        description: PropTypes.any,
        name: PropTypes.any
    }),
    id: PropTypes.any,
    isAdd: PropTypes.bool,
    isEdit: PropTypes.bool
};

export default ExhibitForm;
