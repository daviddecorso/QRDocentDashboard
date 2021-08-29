import { IconHome, IconNotes, IconReportAnalytics } from '@tabler/icons';
import React, { useState } from 'react';
import Brand from '../components/brand';
import NavButton from './buttons/nav-button';

// Style for the nav bar div
const navStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '290px',
    height: '100vh',
    position: 'fixed',
    left: '0',
    top: '0',
    borderRight: '1px solid #B8B8B8',
    paddingBottom: '20vh'
};

const homeIcon = <IconHome size={24} color="white" />;
const anlyIcon = <IconReportAnalytics size={24} color="white" />;
const notesIcon = <IconNotes size={24} color="white" />;

const homeButton = 'Home';
const analyticsButton = 'Analytics';
const exhibitsButton = 'Exhibits';

function NavBar() {
    const [activePage, setActivePage] = useState(homeButton);

    return (
        <div>
            <Brand />
            <div style={navStyle}>
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
    );
}

export default NavBar;
