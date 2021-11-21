import { Link, useHistory, useLocation } from 'react-router-dom';
import { makeStyles, TextField, Typography, useMediaQuery } from '@material-ui/core';
import React, { useState } from 'react';
import ActionButton from '../components/buttons/action-button';
import ActionOutlineButton from '../components/buttons/action-outline-button';
import axios from 'axios';
import Brand from '../components/brand';
import Footer from '../components/footer';
import { getBaseURL } from '../../configuration';
import getExhibits from '../util/getExhibits';
import PropTypes from 'prop-types';

const pageStyles = {
    header: { marginTop: '10vh' },
    button: {
        display: 'flex',
        justifyContent: 'center'
    },
    container: { display: 'flex', flexDirection: 'row' },
    mobileContainer: { display: 'flex', flexDirection: 'column' },
    leftDiv: {
        width: '45vw',
        height: '100vh',
        backgroundColor: '#684DD4',
        paddingLeft: '7vw',
        borderRadius: '0 20px 20px 0'
    },
    rightDiv: { maxWidth: '550px', marginTop: '20vh', marginLeft: '5vw' },
    rightDivMobile: {
        margin: '17vh 5vw 3vh 5vw'
    },
    signinText: { fontSize: '50px', fontWeight: 'bold', marginBottom: '1rem' },
    signinTextMobile: { fontSize: '38px', fontWeight: 'bold', marginBottom: '1rem' },
    subtitleText: { fontSize: '22px', color: '#CBCBCB' },
    subtitleTextMobile: { fontSize: '16px', color: '#CBCBCB' },
    noAcctDiv: { maxWidth: '550px', marginTop: '15vh', marginRight: '3rem' },
    formDiv: { display: 'flex', flexDirection: 'column', maxWidth: '500px' },
    formItem: { marginTop: '1rem' },
    colorLink: { '& a': { color: 'white' } },
    errorDiv: {
        backgroundColor: '#DE312B',
        textAlign: 'center',
        marginTop: '1.5rem',
        borderRadius: '10px',
        maxWidth: '500px'
    },
    contactMobile: {
        textAlign: 'center',
        margin: '2rem 5vw 2rem 5vw',
        paddingBottom: '1.2rem',
        border: '1px solid rgb(118, 118, 118)',
        borderRadius: '4px'
    }
};

function Login({ setExhibits }) {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();

    const isMobile = useMediaQuery('(max-width:960px)');

    const [errorMessage, setErrorMessage] = useState();
    const [emailFieldError, setEmailFieldError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');

    const [passwordFieldError, setPasswordFieldError] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const loginAdminUser = () => {
        const emailInput = document.getElementById('email-input').value;
        const passwordInput = document.getElementById('password-input').value;

        let blankInput = false;
        if (emailInput === '') {
            setEmailFieldError(true);
            setEmailErrorMsg('Email field must not be blank.');
            blankInput = true;
        }
        if (passwordInput === '') {
            setPasswordFieldError(true);
            setPasswordErrorMsg('Password field must not be blank.');
            blankInput = true;
        }
        if (blankInput) {
            return;
        }

        const { from } = location.state || { from: { pathname: '/home' } };
        const body = {
            email: emailInput,
            password: passwordInput
        };
        axios
            .post(getBaseURL() + 'api/loginAdminUser', body)
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('accessToken', res.data.result.accessToken);
                    localStorage.setItem('refreshToken', res.data.result.refreshToken);
                    getExhibits(setExhibits);
                    history.replace(from);
                } else {
                    setErrorMessage('Wrong email or password.');
                }
            })
            .catch(err => {
                setErrorMessage('An unexpected error occurred. Please try again.');
                console.log(err);
            });
    };

    return (
        <>
            <Brand isPagePosition={true} />
            <div className={isMobile ? classes.mobileContainer : classes.container}>
                {!isMobile && (
                    <div className={classes.leftDiv}>
                        <div className={classes.noAcctDiv}>
                            <Typography component="h1" className={classes.signinText}>
                                Don&apos;t have an account?
                            </Typography>
                            <Typography component="p" className={classes.subtitleText}>
                                Get in touch to see what QR Docent can do for your museum!
                            </Typography>
                            <div className={classes.formDiv}>
                                <TextField
                                    id="name-input-contact"
                                    variant="outlined"
                                    label="Name"
                                    className={classes.formItem}
                                />
                                <TextField
                                    id="email-input-contact"
                                    variant="outlined"
                                    label="Email"
                                    className={classes.formItem}
                                />
                                <TextField
                                    id="phone-input-contact"
                                    variant="outlined"
                                    label="Phone number"
                                    className={classes.formItem}
                                />
                                <div className={classes.button}>
                                    <ActionOutlineButton
                                        text={'GET IN TOUCH'}
                                        width={'500px'}
                                        height={'52px'}
                                        bw={'4px'}
                                        fontSize={'24px'}
                                        tm={'1rem'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={isMobile ? classes.rightDivMobile : classes.rightDiv}>
                    <Typography
                        component="h1"
                        className={isMobile ? classes.signinTextMobile : classes.signinText}>
                        Sign in
                    </Typography>
                    <Typography
                        component="p"
                        className={isMobile ? classes.subtitleTextMobile : classes.subtitleText}>
                        Welcome back! Please sign in to your account to access content from your
                        museum.
                    </Typography>
                    <div className={classes.formDiv}>
                        {!emailFieldError && (
                            <TextField
                                id="email-input"
                                variant="outlined"
                                label="Email"
                                className={classes.formItem}
                            />
                        )}

                        {emailFieldError && (
                            <TextField
                                error
                                helperText={emailErrorMsg}
                                id="email-input"
                                variant="outlined"
                                label="Email"
                                className={classes.formItem}
                            />
                        )}

                        {!passwordFieldError && (
                            <TextField
                                id="password-input"
                                variant="outlined"
                                label="Password"
                                type="password"
                                className={classes.formItem}
                            />
                        )}

                        {passwordErrorMsg && (
                            <TextField
                                error
                                helperText={passwordErrorMsg}
                                id="password-input"
                                variant="outlined"
                                label="Password"
                                type="password"
                                className={classes.formItem}
                            />
                        )}

                        <div className={classes.button}>
                            <ActionButton
                                onClick={loginAdminUser}
                                className={classes.button}
                                text={'SIGN IN'}
                                width={'500px'}
                                height={'52px'}
                                fontSize={'24px'}
                                tm={'1rem'}
                            />
                        </div>
                    </div>
                    <div className={classes.colorLink}>
                        <Link>
                            <Typography component="span" variant="body1">
                                Forgot password?
                            </Typography>
                        </Link>
                    </div>
                    <div className={classes.errorDiv}>
                        <Typography component="span" variant="body1">
                            {errorMessage}
                        </Typography>
                    </div>
                </div>
                {isMobile && (
                    <div className={classes.contactMobile}>
                        <h3 style={{ fontSize: '22px' }}>Don&apos;t have an account?</h3>
                        <p style={{ fontSize: '18px' }}>
                            Get in touch to see what QR Docent can do for your museum!
                        </p>
                        <ActionOutlineButton
                            text={'CONTACT US'}
                            width={'190px'}
                            height={'44px'}
                            fontSize={'18px'}
                            path={'/contact'}
                            tm={'.5rem'}
                        />
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

Login.propTypes = {
    setExhibits: PropTypes.func
};

export default Login;
