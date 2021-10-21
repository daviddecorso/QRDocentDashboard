import { IconArrowUpCircle, IconBrandSpotify, IconDeviceAnalytics } from '@tabler/icons';
import ActionButton from '../components/buttons/action-button';
import ActionOutlineButton from '../components/buttons/action-outline-button';
import isLogin from '../contexts/auth';
import { makeStyles } from '@material-ui/core';
import phoneMockup from 'url:../img/app-mockup.png';
import React from 'react';

const pageStyles = {
    heroContent: {
        marginTop: '20vh',
        marginLeft: '7vw',
        maxWidth: '50vw'
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'row'
    },
    mockupImg: {
        width: 'auto',
        height: '800px',
        marginTop: '15vh',
        marginLeft: '10vw',
        zIndex: -1
    },
    title: {
        fontSize: '64px',
        maxWidth: '675px',
        marginBottom: '1.5rem'
    },
    subText: { fontSize: '24px', maxWidth: '675px', marginTop: 0, marginBottom: '3rem' },
    blob: {
        zIndex: -2,
        position: 'absolute',
        right: 0,
        top: 0
    },
    buttons: {
        display: 'flex'
    },
    nav: {
        position: 'fixed',
        right: 0,
        top: '30px',
        '& button': {
            boxShadow: 'none',
            '&:hover': {
                boxShadow: 'none'
            }
        }
    },
    fold: {
        marginTop: '-14vh',
        backgroundColor: '#E1E1E1',
        color: 'black',
        width: '100%',
        height: '500px',
        borderRadius: '170px 170px 0 0',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    blurb: {
        marginTop: '1.5rem',
        fontSize: '28px',
        fontWeight: 'bold',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '245px',
        alignItems: 'center',
        textAlign: 'center'
    }
};

function Landing() {
    const useStyles = makeStyles(pageStyles);
    const isAuth = isLogin();

    const classes = useStyles();

    return (
        <div>
            <div className={classes.nav}>
                {!isAuth && (
                    <ActionOutlineButton
                        text={'SIGN IN'}
                        width={'160px'}
                        height={'46px'}
                        fontSize={'18px'}
                        path={'/login'}
                        rm={'30px'}
                    />
                )}
                {isAuth && (
                    <ActionOutlineButton
                        text={'GO TO DASHBOARD'}
                        width={'250px'}
                        height={'46px'}
                        fontSize={'18px'}
                        path={'/home'}
                        rm={'30px'}
                    />
                )}

                <ActionButton
                    text={'GET THE APP'}
                    width={'190px'}
                    height={'46px'}
                    fontSize={'18px'}
                    path={'/qr'}
                    rm={'40px'}
                />
            </div>
            <div className={classes.mainContent}>
                <div className={classes.heroContent}>
                    <h1 className={classes.title}>A MUSEUM GUIDE FOR THE 21ST CENTURY</h1>
                    <p className={classes.subText}>
                        QR Docent is an app that aims to enhance your museum visit and lets you
                        bring your favorite exhibits home with you!
                    </p>
                    <div className={classes.buttons}>
                        <ActionButton
                            text={'GET THE APP'}
                            width={'236px'}
                            height={'60px'}
                            rm={'40px'}
                            fontSize={'22px'}
                            path={'/qr'}
                        />
                        {!isAuth && (
                            <ActionOutlineButton
                                text={'UPGRADE MY MUSEUM'}
                                width={'322px'}
                                height={'60px'}
                                fontSize={'22px'}
                                path={'/contact'}
                            />
                        )}
                        {isAuth && (
                            <ActionOutlineButton
                                text={'GO TO DASHBOARD'}
                                width={'322px'}
                                height={'60px'}
                                fontSize={'22px'}
                                path={'/home'}
                            />
                        )}
                    </div>
                </div>
                <img
                    className={classes.mockupImg}
                    src={phoneMockup}
                    alt="QR Docent app mockup on mobile device."
                />
            </div>

            <svg
                className={classes.blob}
                style={{ position: 'absolute', right: 0, top: 0 }}
                width="982"
                height="1064"
                viewBox="0 0 982 1064"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M21.3166 224C-21.5 162 34.5
                    75.5 -1.90735e-06 0H929.991H979.609L982
                    1064C982 1064 855.862 1060.19 793.69 986.252C731.517 912.311
                    730.919 774.757 675.921 714.408C620.922 654.058 414.153 636.241
                    339.352 503.456C272.995 469.204 325.094 379.388 263.5 303C224.044
                    254.068 65.7953 288.407 21.3166 224Z"
                    fill="#684DD4"
                />
            </svg>
            <div className={classes.fold}>
                <div className={classes.blurb}>
                    <IconBrandSpotify stroke={1.25} size={60} color={'black'} />
                    <span>CUSTOM PLAYLISTS</span>
                </div>
                <div className={classes.blurb}>
                    <IconDeviceAnalytics stroke={1.25} size={60} color={'black'} />
                    <span>USEFUL ANALYTICS</span>
                </div>
                <div className={classes.blurb}>
                    <IconArrowUpCircle stroke={1.25} size={60} color={'black'} />
                    <span>INCREASED INTERACTION</span>
                </div>
            </div>
            <div>
                <p>More stuff will go here...</p>
            </div>
        </div>
    );
}

export default Landing;
