import { makeStyles, useMediaQuery } from '@material-ui/core';
import appleBadge from 'url:../img/app-store-badge.svg';
import Brand from '../components/brand';
import Footer from '../components/footer';
import googleBadge from 'url:../img/google-play-badge.png';
import phoneMockup from 'url:../img/app-mockup.webp';
import phoneMockupMobile from 'url:../img/app-mockup-mobile.webp';
import React from 'react';

const pageStyles = {
    heroContent: {
        marginTop: '23vh',
        marginLeft: '7vw',
        maxWidth: '50vw'
    },
    heroContentMobile: {
        marginTop: '7vh',
        marginLeft: '4vw',
        marginRight: '4vw'
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'row'
    },
    mainContentMobile: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10vh'
    },
    mockupImg: {
        width: 'auto',
        height: '800px',
        marginTop: '15vh',
        marginLeft: '10vw',
        marginBottom: '10vh',
        zIndex: -1
    },
    mockupImgMobile: {
        width: '70vw',
        height: 'auto',
        marginTop: '5vh',
        marginLeft: '20vw',
        zIndex: -1
    },
    title: {
        fontSize: '54px',
        maxWidth: '675px',
        marginBottom: '1.5rem'
    },
    titleMobile: {
        fontSize: '36px'
    },
    subText: {
        fontSize: '20px',
        maxWidth: '675px',
        marginTop: 0,
        marginBottom: '3rem'
    },
    subTextMobile: {
        fontSize: '1.4rem',
        marginBottom: '3rem'
    },
    blob: {
        zIndex: -2,
        position: 'absolute',
        right: 0,
        top: 0
    },
    blobMobile: { zIndex: -2, position: 'absolute', right: 0, top: '-100px' },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& img': {
            marginRight: '40px'
        }
    },
    buttonsMobile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
};

function QrRedirect() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const isMobile = useMediaQuery('(max-width:960px)');

    return (
        <div>
            <Brand isPagePosition={true} />
            <div className={isMobile ? classes.mainContentMobile : classes.mainContent}>
                <div className={isMobile ? classes.heroContentMobile : classes.heroContent}>
                    <h1 className={isMobile ? classes.titleMobile : classes.title}>
                        UPGRADE YOUR MUSEUM VISIT
                    </h1>
                    <p className={isMobile ? classes.subTextMobile : classes.subText}>
                        QR Docent is an app that aims to enhance your museum visit and lets you
                        bring your favorite exhibits home with you!
                        <br />
                        <br />
                        With QR Docent, you can create a cusom music playlist from your museum
                        visit, view curated songs and videos on your mobile device, and more!
                    </p>

                    <div className={isMobile ? classes.buttonsMobile : classes.buttons}>
                        <a href="">
                            <img
                                style={{ width: '130px', height: '43.45px' }}
                                src={appleBadge}
                                alt=""
                            />
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.danteedmonson.qrdocent">
                            <img
                                style={{ width: '140px', height: 'auto' }}
                                src={googleBadge}
                                alt=""
                            />
                        </a>
                    </div>
                </div>
                {!isMobile && (
                    <img
                        className={classes.mockupImg}
                        src={phoneMockup}
                        alt="QR Docent app mockup on mobile device."
                    />
                )}
                {isMobile && (
                    <img
                        className={classes.mockupImgMobile}
                        src={phoneMockupMobile}
                        alt="QR Docent app mockup on mobile device."
                    />
                )}
            </div>
            <svg
                className={isMobile ? classes.blobMobile : classes.blob}
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
            <Footer />
        </div>
    );
}

export default QrRedirect;
