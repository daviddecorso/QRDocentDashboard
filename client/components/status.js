import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import 'microtip/microtip.css';

const tooltipText = {
    0: 'No QR code has been created for this exhibit.',
    1: 'A QR code has been created for this exhibit, but has not been scanned yet.',
    2: 'A QR code has been created for this exhibit and has been successfully scanned.'
};

export default function Status({ status, isMobile }) {
    let text = '';
    let statusStyle;

    if (status === 1) {
        text = 'CODE CREATED';
        statusStyle = makeStyles({
            root: {
                backgroundColor: '#E87421',
                color: 'white',
                borderRadius: 20,
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingTop: '2px',
                paddingBottom: '2px',
                textTransform: 'uppercase'
            },
            mobile: {
                backgroundColor: '#E87421',
                height: '21px',
                width: '21px',
                borderRadius: '50%',
                display: 'inline-block'
            }
        });
    } else if (status === 2) {
        text = 'CODE IN USE';
        statusStyle = makeStyles({
            root: {
                backgroundColor: '#48CC1F',
                color: '#2F333C',
                borderRadius: 20,
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingTop: '2px',
                paddingBottom: '2px',
                textTransform: 'uppercase'
            },
            mobile: {
                backgroundColor: '#48CC1F',
                height: '21px',
                width: '21px',
                borderRadius: '50%',
                display: 'inline-block'
            }
        });
    } else {
        text = 'NO CODE';
        statusStyle = makeStyles({
            root: {
                backgroundColor: '#DE312B',
                color: 'white',
                borderRadius: 20,
                paddingLeft: '15px',
                paddingRight: '15px',
                paddingTop: '2px',
                paddingBottom: '2px',
                textTransform: 'uppercase'
            },
            mobile: {
                backgroundColor: '#DE312B',
                height: '21px',
                width: '21px',
                borderRadius: '50%',
                display: 'inline-block'
            }
        });
    }

    const classes = statusStyle();
    return (
        <>
            {!isMobile && (
                <span
                    className={classes.root}
                    tabIndex="0"
                    aria-label={tooltipText[status]}
                    role="tooltip"
                    data-microtip-position={'top'}
                    data-microtip-size="large">
                    <b>{text}</b>
                </span>
            )}
            {isMobile && (
                <span
                    className={classes.mobile}
                    tabIndex="0"
                    aria-label={tooltipText[status]}
                    role="tooltip"
                    data-microtip-position={'top-left'}
                    data-microtip-size="medium"></span>
            )}
        </>
    );
}

Status.propTypes = {
    status: PropTypes.number,
    isMobile: PropTypes.bool
};
