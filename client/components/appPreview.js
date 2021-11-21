import phoneOutline from 'url:../img/iphone-transparent.webp';
import PropTypes from 'prop-types';
import React from 'react';

// Gif dimensions should be 2.15:1.
function AppPreview({ webmSrc, mp4Src, previewSrc, altText }) {
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
                alt={''}
            />
            <video
                width="280px"
                height="605px"
                autoPlay
                loop
                muted
                style={{
                    position: 'absolute',
                    top: '11px',
                    left: '15px',
                    zIndex: '3',
                    borderRadius: '40px',
                    pointerEvents: 'none'
                }}>
                <source src={webmSrc} type="video/webm" />
                <source src={mp4Src} type="video/mp4" />
                {altText}
            </video>
            <img
                src={previewSrc}
                style={{
                    width: '280px',
                    height: 'auto',
                    position: 'absolute',
                    top: '11px',
                    left: '15px',
                    zIndex: '2',
                    borderRadius: '40px'
                }}
            />
        </div>
    );
}

AppPreview.propTypes = {
    altText: PropTypes.string,
    mp4Src: PropTypes.string,
    previewSrc: PropTypes.string,
    webmSrc: PropTypes.string
};

export default AppPreview;
