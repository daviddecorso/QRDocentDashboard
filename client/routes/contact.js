import { makeStyles, TextField, Typography, useMediaQuery } from '@material-ui/core';
import React, { useState } from 'react';
import ActionButton from '../components/buttons/action-button';
import atIcon from 'url:../img/at_icon.png';
import axios from 'axios';
import bgBlur from 'url:../img/bg-blur.svg';
import Brand from '../components/brand';
import folderIcon from 'url:../img/folder_icon.png';
import { getBaseURL } from '../../configuration';
import mailIcon from 'url:../img/email_icon.png';
import messageIcon from 'url:../img/message_icon2.png';
import phoneIcon from 'url:../img/phone_icon.png';
import validator from 'validator';

const pageStyles = {
    formDiv: { display: 'flex', flexDirection: 'column', maxWidth: '500px' },
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#E1E1E1',
        color: 'black'
    },
    mobileContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#E1E1E1',
        color: 'black'
    },
    signinText: { fontSize: '50px', fontWeight: 'bold', marginBottom: '1rem' },
    signinTextMobile: { fontSize: '38px', fontWeight: 'bold', marginBottom: '1rem' },
    subtitleText: { fontSize: '22px' },
    formItem: {
        marginTop: '1rem',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black'
        },
        '& .MuiOutlinedInput-input': {
            borderColor: 'black'
        },
        '& .MuiOutlinedInput-notchedOutline:hover': {
            borderColor: 'black'
        },
        '& .MuiFormLabel-root': {
            color: 'black'
        },
        '& .MuiInputBase-input': {
            color: 'black'
        }
    },
    button: {
        display: 'flex',
        justifyContent: 'center'
    },
    leftDiv: {
        width: '45vw',
        height: '100vh',
        backgroundImage: `url(${bgBlur})`,
        paddingLeft: '7vw',
        borderRadius: '0 20px 20px 0'
    },
    noAcctDiv: { maxWidth: '550px', marginTop: '15vh', marginRight: '3rem' },
    rightDiv: { maxWidth: '550px', marginTop: '20vh', marginLeft: '5vw' },
    rightDivMobile: {
        margin: '17vh 5vw 3vh 5vw',
        height: '100vh'
    },
    icon: {
        width: '30vw',
        height: 'auto',
        transform: 'translate(0, 23vh)',
        position: 'absolute'
    }
};

function Contact() {
    const isMobile = useMediaQuery('(max-width:960px)');
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const [nameFieldError, setNameFieldError] = useState(false);
    const [nameFieldMsg, setNameFieldMsg] = useState('');

    const [emailFieldError, setEmailFieldError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');

    const [phoneFieldError, setPhoneFieldError] = useState(false);
    const [phoneErrorMsg, setPhoneErrorMsg] = useState('');

    const [museumnameFieldError, setMuseumnameFieldError] = useState(false);
    const [museumnameErrorMsg, setMuseumnameErrorMsg] = useState('');

    const sendContactMessage = () => {
        let hasError = false;
        const name = document.getElementById('name-input-contact').value;
        const email = document.getElementById('email-input-contact').value;
        const phone = document.getElementById('phone-input-contact').value;
        const museumName = document.getElementById('museumname-input-contact').value;
        const message = document.getElementById('message-input-contact').value;

        if (!validator.isEmail(email)) {
            setEmailFieldError(true);
            setEmailErrorMsg('Please enter a valid email address.');
            hasError = true;
        }

        if (!validator.isMobilePhone(phone)) {
            setPhoneFieldError(true);
            setPhoneErrorMsg('Please enter a valid phone number.');
            hasError = true;
        }

        if (name === '') {
            setNameFieldError(true);
            setNameFieldMsg('Name field must not be blank.');
            hasError = true;
        }

        if (email === '') {
            setEmailFieldError(true);
            setEmailErrorMsg('Email field must not be blank.');
            hasError = true;
        }

        if (phone === '') {
            setPhoneFieldError(true);
            setPhoneErrorMsg('Phone number field must not be blank.');
            hasError = true;
        }

        if (museumName === '') {
            setMuseumnameFieldError(true);
            setMuseumnameErrorMsg('Museum name field must not be blank.');
            hasError = true;
        }

        if (hasError) {
            return;
        }
        const body = {
            name: name,
            email: email,
            phone: phone,
            museumName: museumName,
            message: message
        };

        axios.post(`${getBaseURL()}api/notifyForAdminRegistration`, body);
    };

    const changeIcon = icon => {
        document.getElementById('mail-icon').classList.add('hidden');
        document.getElementById('mail-icon').classList.remove('animated-icon');
        document.getElementById('mail-icon').classList.remove('animated');

        document.getElementById('at-icon').classList.add('hidden');
        document.getElementById('at-icon').classList.remove('animated-icon');
        document.getElementById('at-icon').classList.remove('animated');

        document.getElementById('phone-icon').classList.add('hidden');
        document.getElementById('phone-icon').classList.remove('animated-icon');
        document.getElementById('phone-icon').classList.remove('animated');

        document.getElementById('folder-icon').classList.add('hidden');
        document.getElementById('folder-icon').classList.remove('animated-icon');
        document.getElementById('folder-icon').classList.remove('animated');

        document.getElementById('message-icon').classList.add('hidden');
        document.getElementById('message-icon').classList.remove('animated-icon');
        document.getElementById('message-icon').classList.remove('animated');

        document.getElementById(icon).classList.remove('hidden');
        document.getElementById(icon).classList.add('animated-icon');
        document.getElementById(icon).classList.add('animated');
    };
    return (
        <>
            <Brand isPagePosition={true} />
            <div className={isMobile ? classes.mobileContainer : classes.container}>
                {!isMobile && (
                    <div className={classes.leftDiv}>
                        <img
                            id="mail-icon"
                            src={mailIcon}
                            className={classes.icon}
                            alt="Envelope icon"
                        />
                        <img
                            id="at-icon"
                            src={atIcon}
                            className={`hidden ${classes.icon}`}
                            alt="@ symbol icon"
                        />
                        <img
                            id="phone-icon"
                            src={phoneIcon}
                            className={`hidden ${classes.icon}`}
                            alt="Phone icon"
                        />
                        <img
                            id="folder-icon"
                            src={folderIcon}
                            className={`hidden ${classes.icon}`}
                            alt="Folder icon"
                        />
                        <img
                            id="message-icon"
                            src={messageIcon}
                            className={`hidden ${classes.icon}`}
                            alt="Message icon"
                        />
                    </div>
                )}
                <div className={isMobile ? classes.rightDivMobile : classes.rightDiv}>
                    <div>
                        <Typography component="h1" className={classes.signinText}>
                            Contact us
                        </Typography>
                        <Typography component="p" className={classes.subtitleText}>
                            Get in touch to see what QR Docent can do for your museum!
                        </Typography>
                        <div className={classes.formDiv}>
                            {!nameFieldError && (
                                <TextField
                                    id="name-input-contact"
                                    variant="outlined"
                                    label="Name"
                                    required
                                    className={classes.formItem}
                                    onClick={() => {
                                        changeIcon('mail-icon');
                                    }}
                                />
                            )}

                            {nameFieldError && (
                                <TextField
                                    error
                                    required
                                    helperText={nameFieldMsg}
                                    id="name-input-contact"
                                    variant="outlined"
                                    label="Name"
                                    className={classes.formItem}
                                    onClick={() => {
                                        changeIcon('mail-icon');
                                    }}
                                />
                            )}
                            {!emailFieldError && (
                                <TextField
                                    id="email-input-contact"
                                    variant="outlined"
                                    label="Email"
                                    required
                                    className={`${classes.formItem}`}
                                    onClick={() => {
                                        changeIcon('at-icon');
                                    }}
                                />
                            )}
                            {emailFieldError && (
                                <TextField
                                    error
                                    helperText={emailErrorMsg}
                                    id="email-input-contact"
                                    variant="outlined"
                                    required
                                    label="Email"
                                    className={classes.formItem}
                                    onClick={() => {
                                        changeIcon('at-icon');
                                    }}
                                />
                            )}
                            {!phoneFieldError && (
                                <TextField
                                    id="phone-input-contact"
                                    variant="outlined"
                                    label="Phone number"
                                    required
                                    className={classes.formItem}
                                    onClick={() => {
                                        changeIcon('phone-icon');
                                    }}
                                />
                            )}
                            {phoneFieldError && (
                                <TextField
                                    error
                                    helperText={phoneErrorMsg}
                                    id="phone-input-contact"
                                    variant="outlined"
                                    required
                                    label="Phone"
                                    className={classes.formItem}
                                    onClick={() => {
                                        changeIcon('phone-icon');
                                    }}
                                />
                            )}
                            {!museumnameFieldError && (
                                <TextField
                                    id="museumname-input-contact"
                                    variant="outlined"
                                    label="Museum Name"
                                    required
                                    className={classes.formItem}
                                    onClick={() => {
                                        changeIcon('folder-icon');
                                    }}
                                />
                            )}
                            {museumnameFieldError && (
                                <TextField
                                    error
                                    helperText={museumnameErrorMsg}
                                    id="museumname-input-contact"
                                    variant="outlined"
                                    required
                                    label="Museum Name"
                                    className={classes.formItem}
                                    onClick={() => {
                                        changeIcon('folder-icon');
                                    }}
                                />
                            )}
                            <TextField
                                id="message-input-contact"
                                variant="outlined"
                                label="Message"
                                className={classes.formItem}
                                onClick={() => {
                                    changeIcon('message-icon');
                                }}
                            />
                            <div className={classes.button}>
                                <ActionButton
                                    text={'GET IN TOUCH'}
                                    width={'500px'}
                                    height={'52px'}
                                    bw={'4px'}
                                    fontSize={'24px'}
                                    tm={'1rem'}
                                    onClick={sendContactMessage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
