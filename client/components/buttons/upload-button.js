import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function UploadButton({ width, height, text, fontSize, lm, rm, tm, icon, onChange }) {
    const buttonStyle = makeStyles({
        root: {
            backgroundColor: '#B128F1',
            border: 0,
            borderRadius: 15,
            color: 'white',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '35px',
            paddingRight: '35px',
            marginLeft: lm,
            marginRight: rm,
            marginTop: tm,
            width: width,
            height: height,
            fontSize: fontSize,
            '&:hover': {
                backgroundColor: '#C248FB'
            }
        }
    });

    const classes = buttonStyle();
    const uploadInputRef = useRef();

    return (
        <>
            <input
                ref={uploadInputRef}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={onChange}/>
            <Button
                onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                variant='contained'
                startIcon={icon}
                className={classes.root}>
                {text}
            </Button>
        </>
    );
}

UploadButton.propTypes = {
    fontSize: PropTypes.string,
    height: PropTypes.string,
    icon: PropTypes.element,
    onChange: PropTypes.any,
    rm: PropTypes.string,
    lm: PropTypes.string,
    tm: PropTypes.string,
    text: PropTypes.string,
    width: PropTypes.string
};

export default UploadButton;
