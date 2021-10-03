import {
    IconHelp,
    IconHome,
    IconMenu2,
    IconNotes,
    IconReportAnalytics,
    IconSettings,
    IconX
} from '@tabler/icons';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Brand from '../components/brand';
import MobileNavButton from './buttons/mobile-nav-button';
import NavButton from './buttons/nav-button';

const pageStyles = {
    navStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '290px',
        height: '100vh',
        position: 'fixed',
        left: '0',
        top: '0',
        borderRight: '1px solid #B8B8B8',
        paddingBottom: '20vh',
        '& button': {
            fontSize: '18px'
        }
    },
    darkDiv: {
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: '98'
    },
    icon: {
        marginTop: '5px',
        marginLeft: '5px'
    },
    mobileBrand: {
        position: 'fixed',
        bottom: '20px',
        left: '68px'
    }
};

const homeIcon = <IconHome size={24} color="white" />;
const anlyIcon = <IconReportAnalytics size={24} color="white" />;
const notesIcon = <IconNotes size={24} color="white" />;
const settingsIcon = <IconSettings size={24} color="white" />;
const helpIcon = <IconHelp size={24} color="white" />;

const homeButton = 'Home';
const analyticsButton = 'Analytics';
const exhibitsButton = 'Exhibits';
const settingsButton = 'Settings';
const helpButton = 'Help';

function NavBar() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    // Controls which nav button is highlighted.
    const [activePage, setActivePage] = useState(homeButton);

    // Is the page mobile?
    const isMobile = useMediaQuery('(max-width:960px)');

    // This is all to animate the navbar. The class is in app.css.
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
        <>
            {!isMobile && (
                <div>
                    <Brand />
                    <div className={classes.navStyle}>
                        <NavButton
                            text={homeButton}
                            path={'/'}
                            icon={homeIcon}
                            isHover={activePage === homeButton}
                            setPage={setActivePage}
                        />
                        <NavButton
                            text={analyticsButton}
                            path={'/analytics'}
                            icon={anlyIcon}
                            isHover={activePage === analyticsButton}
                            setPage={setActivePage}
                        />
                        <NavButton
                            text={exhibitsButton}
                            path={'/exhibits'}
                            icon={notesIcon}
                            isHover={activePage === exhibitsButton}
                            setPage={setActivePage}
                        />
                    </div>
                </div>
            )}
            {isMobile && (
                <div>
                    <span onClick={openMobileMenu}>
                        <IconMenu2 size={'34px'} className={classes.icon} />
                    </span>
                    <>
                        <div id="mobile-nav" className="hidden-navbar ">
                            <div style={{ marginBottom: '10vh' }}>
                                <span onClick={closeMobileMenu}>
                                    <IconX size={'34px'} className={classes.icon} />
                                </span>
                            </div>
                            <div className={classes.mobileNavItems}>
                                <MobileNavButton
                                    text={homeButton}
                                    path={'/'}
                                    icon={homeIcon}
                                    isHover={activePage === homeButton}
                                    setPage={setActivePage}
                                    closeMenu={closeMobileMenu}
                                />
                                <MobileNavButton
                                    text={analyticsButton}
                                    path={'/analytics'}
                                    icon={anlyIcon}
                                    isHover={activePage === analyticsButton}
                                    setPage={setActivePage}
                                    closeMenu={closeMobileMenu}
                                />
                                <MobileNavButton
                                    text={exhibitsButton}
                                    path={'/exhibits'}
                                    icon={notesIcon}
                                    isHover={activePage === exhibitsButton}
                                    setPage={setActivePage}
                                    closeMenu={closeMobileMenu}
                                />
                                <hr
                                    style={{
                                        width: '50px',
                                        marginLeft: '80px',
                                        marginTop: '1.5rem',
                                        marginBottom: '1.5rem'
                                    }}
                                />
                                <MobileNavButton
                                    text={settingsButton}
                                    path={'/settings'}
                                    icon={settingsIcon}
                                    isHover={activePage === settingsButton}
                                    setPage={setActivePage}
                                    closeMenu={closeMobileMenu}
                                />
                                <MobileNavButton
                                    text={helpButton}
                                    path={'/help'}
                                    icon={helpIcon}
                                    isHover={activePage === helpButton}
                                    setPage={setActivePage}
                                    closeMenu={closeMobileMenu}
                                />
                            </div>
                            <div className={classes.mobileBrand}>
                                <Brand />
                            </div>
                        </div>
                        <div id="dark-bg-div" className={`${classes.darkDiv} hidden`}></div>
                    </>
                </div>
            )}
        </>
    );
}

export default NavBar;
