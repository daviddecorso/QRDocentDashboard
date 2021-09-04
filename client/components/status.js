import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export default function Status({ status }) {
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
            }
        });
    }

    const classes = statusStyle();
    return (
        <span className={classes.root}>
            <b>{text}</b>
        </span>
    );
}

Status.propTypes = {
    status: PropTypes.number
};
