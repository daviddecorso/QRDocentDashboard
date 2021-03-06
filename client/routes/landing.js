import {
    IconArrowUpCircle,
    IconBrandSpotify,
    IconDashboard,
    IconDeviceAnalytics,
    IconDownload,
    IconLogin,
    IconMenu2,
    IconNotes,
    IconSend,
    IconX
} from '@tabler/icons';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ActionButton from '../components/buttons/action-button';
import ActionOutlineButton from '../components/buttons/action-outline-button';
import analyticsImg from 'url:../img/laptop-analytics-2.webp';
import AppPreview from '../components/appPreview';
import Brand from '../components/brand';
import exhibitsMp4 from 'url:../img/vid/exhibits-sized.mp4';
import exhibitsPreview from 'url:../img/vid/exhibits-placeholder.webp';
import exhibitsWebm from 'url:../img/vid/exhibits-sized.webm';
import Footer from '../components/footer';
import greyWave from 'url:../img/grey-wave.svg';
import isLogin from '../util/auth';
import MobileNavButton from '../components/buttons/mobile-nav-button';
import phoneMockup from 'url:../img/app-mockup.webp';
import phoneMockupMobile from 'url:../img/app-mockup-mobile.webp';
import playlistMp4 from 'url:../img/vid/playlist-sized.mp4';
import playlistPreview from 'url:../img/vid/playlist-placeholder.webp';
import playlistWebm from 'url:../img/vid/playlist-sized.webm';
import purpleWave from 'url:../img/purple-wave-2.svg';
import purpleWave2 from 'url:../img/purple-wave-3.svg';
import { Waypoint } from 'react-waypoint';
import whiteWave from 'url:../img/white-wave.svg';

// Icons and text for navbar
const downloadIcon = <IconDownload size={24} color="white" />;
const loginIcon = <IconLogin size={24} color="white" />;
const dashboardIcon = <IconDashboard size={24} color="white" />;
const privacyIcon = <IconNotes size={24} color="white" />;
const contactIcon = <IconSend size={24} color="white" />;

const downloadButton = 'Get the app';
const loginButton = 'Sign in';
const dashboardButton = 'Dashboard';
const privacyButton = 'Privacy';
const contactButton = 'Contact us';

const pageStyles = {
    heroContent: {
        marginTop: '20vh',
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
        fontSize: '64px',
        maxWidth: '675px',
        marginBottom: '1.5rem'
    },
    titleMobile: {
        fontSize: '36px'
    },
    subText: {
        fontSize: '24px',
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
        display: 'flex'
    },
    buttonsMobile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    nav: {
        position: 'absolute',
        right: 0,
        top: '30px',
        '& button': {
            boxShadow: 'none',
            '&:hover': {
                boxShadow: 'none'
            }
        }
    },
    navMobile: {
        marginTop: '1vh',
        display: 'flex',
        justifyContent: 'center',
        '& button': {
            boxShadow: 'none',
            '&:hover': {
                boxShadow: 'none'
            }
        }
    },
    fold: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    foldContainer: {
        marginTop: '-14vh',
        backgroundColor: '#E1E1E1',
        color: 'black',
        height: '370px',
        width: '100%',
        borderRadius: '170px 170px 0 0'
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
    },
    purpleWave: {
        marginTop: '7vh'
    },
    purpleContent: {
        backgroundColor: '#684DD4',
        marginBottom: '-1vh'
    },
    whiteContent: {
        backgroundColor: '#E1E1E1',
        paddingBottom: '3vh'
    },
    whiteContentMobile: {
        backgroundColor: '#E1E1E1'
    },
    greyContent: {
        paddingBottom: '10vh',
        backgroundColor: '#282B33'
    },
    greyContentMobile: {
        paddingBottom: '2vh',
        backgroundColor: '#282B33'
    },
    featureDiv: {
        marginLeft: '7vw',
        marginTop: '2vh',
        display: 'flex'
    },
    featureDivMobile: {
        display: 'flex',
        flexDirection: 'column'
    },
    featureTitle: {
        fontSize: '2.3rem'
    },
    featureTitleMobile: {
        fontSize: '1.9rem',
        marginTop: '0',
        marginBottom: '1rem',
        textAlign: 'center',
        marginRight: '10px'
    },
    featureTextDiv: {
        maxWidth: '40vw',
        marginTop: '6vh'
    },
    featureTextDivMobile: {
        marginLeft: '4vw',
        marginRight: '4vw'
    },
    featureText: {
        fontSize: '1.2rem'
    },
    featureTitleRight: {
        fontSize: '2.3rem',
        textAlign: 'left',
        marginTop: '7vh'
    },
    featureDivRight: {
        display: 'flex',
        justifyContent: 'space-around',
        marginRight: '7vw',
        color: 'black'
    },
    featureDivRightMobile: {
        display: 'flex',
        flexDirection: 'column',
        color: 'black'
    },
    featureTextRight: {
        textAlign: 'left',
        maxWidth: '40vw',
        fontSize: '1.2rem'
    },
    photoDiv: {
        marginLeft: '13%'
    },
    photoDivMobile: {
        display: 'flex',
        justifyContent: 'center'
    },
    laptopPhoto: {
        marginLeft: '4%'
    },
    laptopPhotoMobile: {
        textAlign: 'center',
        marginTop: '4vh'
    },
    photoDivRight: {
        marginLeft: '7vw'
    },
    ctaDiv: {
        textAlign: 'center',
        backgroundColor: '#684DD4',
        paddingBottom: '10vh'
    },
    animated: {
        animationDuration: '1.2s',
        animationFillMode: 'both',
        WebkitAnimationDuration: '1.2s',
        WebkitAnimationFillMode: 'both'
    },
    animatedFadeInUpText: {
        opacity: 0
    },
    fadeInUpText: {
        opacity: 0,
        animationName: 'fadeInUpText',
        WebkitAnimationName: 'fadeInUpText'
    }
};

function Landing() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    const isAuth = isLogin();

    // const isLaptop = useMediaQuery('(max-width:1300px');
    const isMobile = useMediaQuery('(max-width:960px)');

    // Controls which nav button is highlighted.
    const [activePage, setActivePage] = useState('');

    // State for mobile navbar
    let navBar;
    let navBarBg;

    useEffect(() => {
        navBar = document.getElementById('mobile-nav');
        navBarBg = document.getElementById('dark-bg-div');
    });

    const openMobileMenu = () => {
        navBar.classList.remove('hidden-navbar');
        navBar.classList.add('mobile-navbar');
        navBarBg.classList.toggle('hidden');
    };

    const closeMobileMenu = () => {
        navBar.classList.remove('mobile-navbar');
        navBarBg.classList.toggle('hidden');
        navBar.classList.add('hidden-navbar');
    };

    return (
        <div>
            {!isMobile && <Brand isPagePosition={true} />}
            {!isMobile && (
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
            )}
            {isMobile && (
                <div>
                    <span onClick={openMobileMenu} style={{ position: 'fixed', zIndex: '20' }}>
                        <IconMenu2 size={'34px'} className={classes.icon} />
                    </span>
                    <>
                        <div id="mobile-nav" className="hidden-navbar ">
                            <div style={{ marginBottom: '10vh' }}>
                                <span onClick={closeMobileMenu}>
                                    <IconX size={'34px'} className={classes.icon} />
                                </span>
                            </div>
                            <div>
                                <MobileNavButton
                                    text={downloadButton}
                                    path={'/qr'}
                                    icon={downloadIcon}
                                    isHover={activePage === downloadButton}
                                    setPage={setActivePage}
                                    closeMenu={closeMobileMenu}
                                />
                                {!isAuth && (
                                    <MobileNavButton
                                        text={loginButton}
                                        path={'/login'}
                                        icon={loginIcon}
                                        isHover={activePage === loginButton}
                                        setPage={setActivePage}
                                        closeMenu={closeMobileMenu}
                                    />
                                )}
                                {isAuth && (
                                    <MobileNavButton
                                        text={dashboardButton}
                                        path={'/home'}
                                        icon={dashboardIcon}
                                        isHover={activePage === dashboardButton}
                                        setPage={setActivePage}
                                        closeMenu={closeMobileMenu}
                                    />
                                )}
                                {isAuth && <MobileNavButton />}
                                <hr
                                    style={{
                                        width: '50px',
                                        marginLeft: '80px',
                                        marginTop: '1.5rem',
                                        marginBottom: '1.5rem'
                                    }}
                                />
                                <MobileNavButton
                                    text={privacyButton}
                                    path={'/privacy'}
                                    icon={privacyIcon}
                                    isHover={activePage === privacyButton}
                                    setPage={setActivePage}
                                    closeMenu={closeMobileMenu}
                                />
                                <MobileNavButton
                                    text={contactButton}
                                    path={'/contact'}
                                    icon={contactIcon}
                                    isHover={activePage === contactButton}
                                    setPage={setActivePage}
                                    closeMenu={closeMobileMenu}
                                />
                            </div>
                            <div>
                                <Brand />
                            </div>
                        </div>
                        <div id="dark-bg-div" className={`${classes.darkDiv} hidden`}></div>
                    </>
                </div>
            )}

            <div className={isMobile ? classes.mainContentMobile : classes.mainContent}>
                <div className={isMobile ? classes.heroContentMobile : classes.heroContent}>
                    <h1 className={isMobile ? classes.titleMobile : classes.title}>
                        A MUSEUM GUIDE FOR THE 21ST CENTURY
                    </h1>
                    <p className={isMobile ? classes.subTextMobile : classes.subText}>
                        QR Docent is an app that aims to enhance your museum visit and lets you
                        bring your favorite exhibits home with you!
                    </p>
                    {!isMobile && (
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
                    )}
                    {isMobile && (
                        <div className={classes.buttonsMobile}>
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
                            <ActionButton
                                text={'GET THE APP'}
                                width={'322px'}
                                height={'60px'}
                                tm={'20px'}
                                fontSize={'22px'}
                                path={'/qr'}
                            />
                        </div>
                    )}
                </div>
                {!isMobile && (
                    <img
                        className={'animated animatedFadeInUpImage fadeInUp'}
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
            {!isMobile && (
                <div className={classes.foldContainer}>
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
                    <img
                        className={classes.purpleWave}
                        src={purpleWave}
                        alt="Purple wave graphic"
                    />
                </div>
            )}
            <div className={classes.purpleContent}>
                {isMobile && (
                    <img
                        style={{ backgroundColor: '#282B33' }}
                        src={purpleWave}
                        alt="Purple wave graphic"
                    />
                )}
                <div className={isMobile ? classes.featureDivMobile : classes.featureDiv}>
                    <div
                        id="playlist-title-div"
                        className={
                            isMobile
                                ? classes.featureTextDivMobile
                                : `${classes.featureTextDiv} ${classes.animatedFadeInUpText}`
                        }>
                        <Waypoint
                            onEnter={() => {
                                document
                                    .getElementById('playlist-title-div')
                                    .classList.add(classes.animated, classes.fadeInUpText);
                            }}>
                            <h3
                                className={
                                    isMobile ? classes.featureTitleMobile : classes.featureTitle
                                }>
                                CUSTOM PLAYLISTS
                            </h3>
                        </Waypoint>

                        {isMobile && (
                            <div className={classes.photoDivMobile}>
                                <AppPreview
                                    webmSrc={playlistWebm}
                                    mp4Src={playlistMp4}
                                    previewSrc={playlistPreview}
                                    altText={
                                        'Video showing how to generate a playlist on the QR Docent app.'
                                    }
                                />
                            </div>
                        )}
                        <p className={classes.featureText}>
                            QR Docent lets users make custom Spotify playlists so they can listen to
                            the music they loved from your museum again and again.
                        </p>
                        <p className={classes.featureText}>
                            Simply scan an exhibit&apos;s QR code using the app, and a curated list
                            of songs related to that exhibit will be added to a playlist for you.
                        </p>
                        <p className={classes.featureText}>
                            Continue scanning as you go about the museum, and at the end of your
                            visit you&apos;ll have a unique playlist catered to your music tastes!
                        </p>
                    </div>
                    {!isMobile && (
                        <div className={classes.photoDiv}>
                            <AppPreview
                                webmSrc={playlistWebm}
                                mp4Src={playlistMp4}
                                previewSrc={playlistPreview}
                                altText={
                                    'Video showing how to generate a playlist on the QR Docent app.'
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={isMobile ? classes.whiteContentMobile : classes.whiteContent}>
                <div
                    style={
                        isMobile
                            ? { backgroundColor: '#684DD4', height: '60px' }
                            : { backgroundColor: '#684DD4', height: '250px' }
                    }>
                    <img
                        className={isMobile ? classes.purpleWaveMobile : classes.purpleWave}
                        src={whiteWave}
                        alt=""
                    />
                </div>
                {!isMobile && (
                    <div className={classes.featureDivRight}>
                        <div className={classes.photoDivRight}>
                            <AppPreview
                                webmSrc={exhibitsWebm}
                                mp4Src={exhibitsMp4}
                                previewSrc={exhibitsPreview}
                                altText={
                                    'Video showing an example exhibits page on the QR Docent app.'
                                }
                            />
                        </div>
                        <Waypoint
                            topOffset={'50px'}
                            onEnter={() => {
                                document
                                    .getElementById('interaction-title-div')
                                    .classList.add(classes.animated, classes.fadeInUpText);
                            }}>
                            <div
                                id="interaction-title-div"
                                className={`${classes.featureTextDiv}${classes.animatedFadeInUpText}`}>
                                <h3
                                    className={
                                        isMobile
                                            ? classes.featureTitleMobile
                                            : classes.featureTitleRight
                                    }>
                                    INCREASED INTERACTION
                                </h3>
                                <p className={classes.featureTextRight}>
                                    QR Docent provides visitors with interesting and relevant
                                    content on their own smartphone that they can take home with
                                    them after their visit.
                                </p>
                                <p className={classes.featureTextRight}>
                                    When visitors scan an exhibit&apos;s QR code they are greeted
                                    with curated content that excels on mobile devices, like videos,
                                    songs, and images they can view in the app.
                                </p>
                                <p className={classes.featureTextRight}>
                                    This personalized list of interactive content will be impactful
                                    and keep visitors engaged during their visit.
                                </p>
                            </div>
                        </Waypoint>
                    </div>
                )}
                {isMobile && (
                    <div className={classes.featureDivRightMobile}>
                        <div className={classes.featureTextDivMobile}>
                            <h3 className={classes.featureTitleMobile}>INCREASED INTERACTION</h3>
                            <div className={classes.photoDivMobile}>
                                <AppPreview
                                    webmSrc={exhibitsWebm}
                                    mp4Src={exhibitsMp4}
                                    previewSrc={exhibitsPreview}
                                    altText={
                                        'Video showing an example exhibits page on the QR Docent app.'
                                    }
                                />
                            </div>
                            <p className={classes.featureText}>
                                QR Docent provides visitors with interesting and relevant content on
                                their own smartphone that they can take home with them after their
                                visit.
                            </p>
                            <p className={classes.featureText}>
                                When visitors scan an exhibit&apos;s QR code they are greeted with
                                curated content that excels on mobile devices, like videos, songs,
                                and images they can view in the app.
                            </p>
                            <p className={classes.featureText}>
                                This personalized list of interactive content will be impactful and
                                keep visitors engaged during their visit.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div className={isMobile ? classes.greyContentMobile : classes.greyContent}>
                <div
                    style={
                        isMobile
                            ? { backgroundColor: '#E1E1E1', height: '95px' }
                            : { backgroundColor: '#E1E1E1', height: '300px' }
                    }>
                    <img className={classes.purpleWave} src={greyWave} alt="" />
                </div>
                <div className={isMobile ? classes.featureDivMobile : classes.featureDiv}>
                    <div
                        id="analytics-title"
                        className={
                            isMobile
                                ? classes.featureTextDivMobile
                                : `${classes.featureTextDiv} ${classes.animatedFadeInUpText}`
                        }>
                        <Waypoint
                            onEnter={() => {
                                document
                                    .getElementById('analytics-title')
                                    .classList.add(classes.animated, classes.fadeInUpText);
                            }}>
                            <h3
                                style={{ marginTop: '2rem' }}
                                className={
                                    isMobile ? classes.featureTitleMobile : classes.featureTitle
                                }>
                                USEFUL ANALYTICS
                            </h3>
                        </Waypoint>
                        {isMobile && (
                            <div className={classes.laptopPhotoMobile}>
                                <img
                                    style={{ width: '90vw', height: 'auto' }}
                                    src={analyticsImg}
                                    alt="Screenshot from the analytics page of the QR Docent website"
                                />
                            </div>
                        )}

                        <p className={classes.featureText}>
                            QR Docent provides museums with useful analytics, empowering them to
                            make their museum the best it can be and give visitors more of what they
                            love.
                        </p>
                        <p className={classes.featureText}>
                            Our online platform lets owners view valuable data, like which exhibits
                            are most popular, the average time a visitor spends in the museum, and
                            more.
                        </p>
                        <p className={classes.featureText}>
                            QR Docent respects user privacy and does not store any personally
                            identifying information about users. All analytics data is anonymous.
                        </p>
                    </div>
                    {!isMobile && (
                        <div className={classes.laptopPhoto}>
                            <img
                                style={{ width: '46vw', height: 'auto' }}
                                src={analyticsImg}
                                alt="Screenshot from the analytics page of the QR Docent website"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={classes.ctaDiv}>
                <div
                    style={
                        isMobile
                            ? { backgroundColor: '#282B33', height: '80px' }
                            : { backgroundColor: '#282B33', height: '190px' }
                    }>
                    <img className={classes.purpleWave} src={purpleWave2} alt="" />
                </div>
                <div>
                    <h3 className={classes.featureTitle}>READY TO UPGRADE YOUR MUSEUM?</h3>
                    <p className={classes.featureText}>
                        Get in touch with our team to find a solution that works best for your
                        museum.
                    </p>
                    <ActionButton
                        text={'CONTACT US'}
                        width={'236px'}
                        height={'60px'}
                        fontSize={'22px'}
                        tm={'30px'}
                        path={'/contact'}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Landing;
