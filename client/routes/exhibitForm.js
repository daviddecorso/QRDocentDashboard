import {
    Button,
    FormControl,
    IconButton,
    LinearProgress,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';
import {
    IconArrowLeft,
    IconDeviceFloppy,
    IconHelp,
    IconPlus,
    IconPrinter,
    IconX
} from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExhibitList from '../components/buttons/exhibit-list-button';
import { getBaseURL } from '../../configuration';
import isURL from 'validator/es/lib/isURL';
import PreviewContainer from '../components/previewContainer';
import PrimaryButton from '../components/buttons/primary-button';
import PropTypes from 'prop-types';
import SuccessButton from '../components/buttons/success-button';
import WarningButton from '../components/buttons/warning-button';
import 'microtip/microtip.css';

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
    bio: 'The biography field will display long-form text describing the exhibit.',
    mainImg:
        'This is an image link that will be the thumbnail for the exhibit and appear at the top of the exhibit page.',
    video: 'The video card accepts a link from a video-sharing platform, like YouTube.',
    song: 'The song card accepts a Spotify link.',
    website: 'The website card accepts a link from a website.',
    image: 'The image card accepts a link from an image hosted online.'
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

function ExhibitForm({
    isAdd,
    isEdit,
    id,
    exhibit,
    exhibits,
    setExhibits,
    setOpenSuccess,
    setSnackbarText
}) {
    // State for showing active card in card list
    const [activeButton, setActiveButton] = useState(1);

    // State for storing content array
    const [contentArr, setContentArr] = useState([]);

    // State for active card type
    const [cardType, setCardType] = useState('');

    const [cardPosition, setCardPosition] = useState(1);

    // State for showing progress bar
    const [isLoading, setIsLoading] = useState(false);

    const [toggleCards, setToggleCards] = useState(false);

    // State for showing error when exhibit name is left empty
    const [noNameError, setNameError] = useState(false);
    const [mainImageLinkError, setMainImageLinkError] = useState(false);
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
                const firstCardType = getContentTypeFromId(exhibit.contents[0].contentTypeID);
                if (cardType === '') {
                    setCardType(firstCardType);
                    document
                        .getElementById(`${firstCardType.toLowerCase()}-input-container`)
                        .classList.remove('invisible');

                    document.getElementById('name-input').value = exhibit.name;
                    document.getElementById('bio-input').value = exhibit.description;
                    document.getElementById('mainimage-input').value = exhibit.mainImage;

                    document.getElementById(firstCardType.toLowerCase() + '-input').value =
                        exhibit.contents[0].URL;

                    document.getElementById(
                        firstCardType.toLowerCase() + '-description-input'
                    ).value = exhibit.contents[0].description;
                }

                setContentArr(exhibit.contents);
            }
        }
    }, [cardType, exhibit, contentArr]);

    const setFormProps = (linkText, descText, cardId, position) => {
        document
            .getElementById(`${cardType.toLowerCase()}-input-container`)
            .classList.add('invisible');
        setCardType(getContentTypeFromId(cardId));
        document
            .getElementById(`${getContentTypeFromId(cardId).toLowerCase()}-input-container`)
            .classList.remove('invisible');
        document.getElementById(
            `${getContentTypeFromId(cardId).toLowerCase()}-input`
        ).value = linkText;
        document.getElementById(
            `${getContentTypeFromId(cardId).toLowerCase()}-description-input`
        ).value = descText;
        setCardPosition(position);
    };

    const validateInput = () => {
        const input = document.getElementById(cardType.toLowerCase() + '-input').value;
        const mainImg = document.getElementById('mainimage-input').value;
        let error = false;

        if (!isURL(mainImg)) {
            setErrText('Must be a valid URL.');
            setMainImageLinkError(true);
        }

        if (mainImg === '') {
            setErrText('Field must not be empty.');
            setMainImageLinkError(true);
        }

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
            description: document.getElementById(cardType.toLowerCase() + '-description-input')
                .value,
            position: tempArr.length + 1,
            contentTypeID: getContentTypeId(cardType)
        };

        tempArr.push(newCard);
        setContentArr(tempArr);
        setActiveButton(tempArr.length);
    };

    const editCard = () => {
        const tempArr = contentArr;
        if (!validateInput()) {
            return false;
        }

        tempArr[cardPosition - 1].URL = document.getElementById(
            cardType.toLowerCase() + '-input'
        ).value;
        tempArr[cardPosition - 1].description = document.getElementById('description-input').value;

        setContentArr(tempArr);
    };

    // Save exhibit
    const onClickSave = () => {
        // Errors if exhibit name is empty.
        if (!document.getElementById('name-input').value) {
            setNameError(true);
            return false;
        }

        const newExhibit = {
            name: document.getElementById('name-input').value,
            description: document.getElementById('bio-input').value,
            mainImage: document.getElementById('mainimage-input').value,
            contents: contentArr
        };

        const tempExhibitsArr = exhibits;

        setIsLoading(true);

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

                            axios
                                .get(getBaseURL() + '/api/refreshAdminUserToken', {
                                    headers: {
                                        Authorization:
                                            'Bearer ' + localStorage.getItem('refreshToken')
                                    }
                                })
                                .then(tokenRes => {
                                    if (tokenRes.data.success) {
                                        console.log('Token Refreshed!');
                                        localStorage.setItem(
                                            'accessToken',
                                            tokenRes.data.result.accessToken
                                        );
                                        axios
                                            .post(
                                                getBaseURL() + '/api/createMuseumExhibit',
                                                newExhibit,
                                                {
                                                    headers: {
                                                        Authorization:
                                                            'Bearer ' +
                                                            tokenRes.data.result.accessToken
                                                    }
                                                }
                                            )
                                            .then(result => {
                                                // success!
                                                console.log(result);
                                                setOpenSuccess(true);
                                                setSnackbarText('Successfully created exhibit!');
                                                tempExhibitsArr.push(newExhibit);
                                                setExhibits(tempExhibitsArr);
                                                location.assign(getBaseURL() + '/exhibits');
                                            })
                                            .catch(err => {
                                                // error!!
                                                console.log(err);
                                            });
                                    } else {
                                        // If a user's refresh token is invalid we want them to login again.
                                        console.error('Invalid refresh token.');
                                        localStorage.setItem('accessToken', 'logout');
                                        localStorage.setItem('refreshToken', 'logout');
                                        location.assign(getBaseURL() + '/login');
                                    }
                                });
                        }
                    } else {
                        // success message
                        setOpenSuccess(true);
                        setSnackbarText('Successfully created exhibit!');
                        tempExhibitsArr.push(newExhibit);
                        setExhibits(tempExhibitsArr);
                        location.assign(getBaseURL() + '/exhibits');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

        if (isEdit) {
            const editedExhibit = {
                exhibitID: Number(id),
                name: document.getElementById('name-input').value,
                description: document.getElementById('bio-input').value,
                mainImage: document.getElementById('mainimage-input').value,
                contents: contentArr
            };

            axios
                .post(getBaseURL() + '/api/updateMuseumExhibit', editedExhibit, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
                .then(res => {
                    console.log(res);
                    if (!res.data.success) {
                        if (res.data.message === 'jwt expired') {
                            console.log('JWT EXPIRED!');

                            axios
                                .get(getBaseURL() + '/api/refreshAdminUserToken', {
                                    headers: {
                                        Authorization:
                                            'Bearer ' + localStorage.getItem('refreshToken')
                                    }
                                })
                                .then(tokenRes => {
                                    if (tokenRes.data.success) {
                                        console.log('Token Refreshed!');
                                        localStorage.setItem(
                                            'accessToken',
                                            tokenRes.data.result.accessToken
                                        );
                                        axios
                                            .post(
                                                getBaseURL() + '/api/updateMuseumExhibit',
                                                editedExhibit,
                                                {
                                                    headers: {
                                                        Authorization:
                                                            'Bearer ' +
                                                            tokenRes.data.result.accessToken
                                                    }
                                                }
                                            )
                                            .then(result => {
                                                // success!
                                                setOpenSuccess(true);
                                                setSnackbarText('Exhibit saved!');
                                                console.log(result);
                                                location.assign(getBaseURL() + '/exhibits');
                                            })
                                            .catch(err => {
                                                // error!!
                                                console.log(err);
                                            });
                                    } else {
                                        // If a user's refresh token is invalid we want them to login again.
                                        console.error('Invalid refresh token.');
                                        localStorage.setItem('accessToken', 'logout');
                                        localStorage.setItem('refreshToken', 'logout');
                                        location.assign(getBaseURL() + '/login');
                                    }
                                });
                        }
                    } else {
                        // success message
                        setOpenSuccess(true);
                        setSnackbarText('Exhibit saved!');
                        tempExhibitsArr.push(newExhibit);
                        setExhibits(tempExhibitsArr);
                        location.assign(getBaseURL() + '/exhibits');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const handleSelectChange = event => {
        document.getElementById(cardType.toLowerCase() + '-input').value = '';
        document.getElementById(cardType.toLowerCase() + '-description-input').value = '';
        document.getElementById(event.target.value.toLowerCase() + '-input').value = '';
        document.getElementById(event.target.value.toLowerCase() + '-description-input').value = '';
        document
            .getElementById(`${cardType.toLowerCase()}-input-container`)
            .classList.add('invisible');
        setCardType(event.target.value);
        document
            .getElementById(`${event.target.value.toLowerCase()}-input-container`)
            .classList.remove('invisible');
        document.getElementById(event.target.value.toLowerCase() + '-input').value = '';
        document.getElementById(event.target.value.toLowerCase() + '-description-input').value = '';
    };

    return (
        <>
            <div className={classes.backButtonDiv}>
                <IconButton
                    onClick={() => {
                        location.assign(getBaseURL() + '/exhibits');
                    }}>
                    <IconArrowLeft />
                </IconButton>
            </div>

            <div className={classes.content}>
                <div className={classes.container}>
                    <div>
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
                                <TextField
                                    label="Exhibit Image Link"
                                    id="mainimage-input"
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    error={mainImageLinkError}
                                    helperText={errText}
                                />
                                <span
                                    tabIndex="0"
                                    aria-label={tooltipText.mainImg}
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
                                {isEdit && (
                                    <div>
                                        <PrimaryButton
                                            text={'SAVE CARD'}
                                            width={'180px'}
                                            height={'40px'}
                                            fontSize={'14px'}
                                            lm={'1rem'}
                                            onClick={editCard}
                                            icon={<IconDeviceFloppy size={22} />}
                                        />
                                    </div>
                                )}
                            </div>
                            <div id="video-input-container" className={'invisible'}>
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
                                <div className={classes.formInput}>
                                    <TextField
                                        label={'Video description'}
                                        id="video-description-input"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                            <div id="song-input-container" className={'invisible'}>
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
                                <div className={classes.formInput}>
                                    <TextField
                                        label={'Song description'}
                                        id="song-description-input"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                            <div id="website-input-container" className={'invisible'}>
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
                                <div className={classes.formInput}>
                                    <TextField
                                        label={'Website description'}
                                        id="website-description-input"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                            <div id="image-input-container" className={'invisible'}>
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
                                <div className={classes.formInput}>
                                    <TextField
                                        label={'Image description'}
                                        id="image-description-input"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>
                            </div>

                            {/* {cardType !== '' && (
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
                            )} */}
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
                                    width={'200px'}
                                    rm={isSmallMobile ? '5rem' : '0'}
                                    path={'/exhibits'}
                                    icon={<IconX />}
                                    isMobile={isSmallMobile}
                                />
                                <SuccessButton
                                    text={'SAVE EXHIBIT'}
                                    width={'200px'}
                                    lm={isSmallMobile ? '0' : '2rem'}
                                    icon={<IconDeviceFloppy />}
                                    onClick={onClickSave}
                                    isMobile={isSmallMobile}
                                />
                            </div>
                        </div>
                        {isLoading && <LinearProgress style={{ marginTop: '1rem' }} />}
                    </div>
                    <div className={classes.previewContainer}>
                        <div style={{ display: 'flex' }}>
                            <Button
                                className={
                                    !toggleCards ? classes.cardButtonHighlight : classes.cardButton
                                }
                                style={{ borderRadius: '30px 0 0 30px' }}
                                onClick={() => {
                                    setToggleCards(false);
                                }}>
                                Cards
                            </Button>
                            <Button
                                className={
                                    toggleCards ? classes.cardButtonHighlight : classes.cardButton
                                }
                                style={{ borderRadius: '0 30px 30px 0' }}
                                onClick={() => {
                                    setToggleCards(true);
                                }}>
                                Preview
                            </Button>
                        </div>
                        {!toggleCards && (
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
                                        setFormProps={setFormProps}
                                    />
                                ))}
                            </div>
                        )}
                        {toggleCards && (
                            <div style={{ display: 'flex', placeContent: 'center' }}>
                                <PreviewContainer
                                    exhibit={{
                                        description: document.getElementById('bio-input').value,
                                        mainImage: document.getElementById('mainimage-input').value,
                                        name: document.getElementById('name-input').value,
                                        scanID: Number(id),
                                        contents: contentArr
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

ExhibitForm.propTypes = {
    exhibit: PropTypes.shape({
        contents: PropTypes.any,
        description: PropTypes.any,
        mainImage: PropTypes.any,
        name: PropTypes.any
    }),
    exhibits: PropTypes.any,
    id: PropTypes.any,
    isAdd: PropTypes.bool,
    isEdit: PropTypes.bool,
    setExhibits: PropTypes.func,
    setOpenSuccess: PropTypes.func,
    setSnackbarText: PropTypes.func
};

export default ExhibitForm;
