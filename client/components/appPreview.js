import phoneOutline from 'url:../img/iphone-transparent.png';
import PropTypes from 'prop-types';
import React from 'react';

// Gif dimensions should be 2.15:1.
function AppPreview({ gifSrc }) {
    return (
        <div style={{ position: 'relative', height: '627px', width: '310px' }}>
            <img
                src={phoneOutline}
                style={{
                    width: '310px',
                    height: 'auto',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '4'
                }}
            />
            <img
                src={gifSrc}
                style={{
                    width: '280px',
                    height: 'auto',
                    position: 'absolute',
                    top: '11px',
                    left: '15px',
                    zIndex: '3',
                    borderRadius: '40px'
                }}
            />
        </div>
    );
}

AppPreview.propTypes = {
    gifSrc: PropTypes.any
};

export default AppPreview;
