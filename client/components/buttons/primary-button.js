import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

function PrimaryButton({ width, height, text, fontSize, rm }) {
    const primaryButtonStyle = makeStyles({
        root: {
            background: 'linear-gradient(180deg, #614AD3, #864AD3)',
            border: 0,
            borderRadius: 20,
            color: 'white',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '35px',
            paddingRight: '35px',
            marginRight: rm,
            width: width,
            height: height,
            fontSize: fontSize
        }
    });

    const classes = primaryButtonStyle();
    return (
        <>
            <Button className={classes.root}>{text}</Button>
        </>
    );
}

PrimaryButton.propTypes = {
    fontSize: PropTypes.string,
    height: PropTypes.string,
    rm: PropTypes.string,
    text: PropTypes.string,
    width: PropTypes.string
};

export default PrimaryButton;
