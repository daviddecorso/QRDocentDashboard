import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

function SuccessButton({
    width,
    height,
    text,
    fontSize,
    lm,
    rm,
    tm,
    bm,
    icon,
    path,
    onClick,
    isMobile
}) {
    const successButtonStyle = makeStyles({
        root: {
            backgroundColor: '#48CC1F',
            color: 'white',
            '&:hover': {
                backgroundColor: '#4DF11A',
                color: 'white'
            },
            border: 0,
            borderRadius: 20,
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '35px',
            paddingRight: '35px',
            marginLeft: lm,
            marginRight: rm,
            width: width,
            height: height,
            fontSize: fontSize
        },
        mobile: {
            backgroundColor: '#48CC1F',
            color: 'white',
            '&:hover': {
                backgroundColor: '#4DF11A',
                color: 'white'
            },
            border: 0,
            borderRadius: '50%',
            marginLeft: lm,
            marginRight: rm,
            marginTop: tm,
            marginBottom: bm,
            width: '48px',
            height: '48px'
        }
    });

    const classes = successButtonStyle();
    return (
        <>
            {path ? (
                <Link to={path} style={{ textDecoration: 'none' }}>
                    {!isMobile && (
                        <Button className={classes.root} startIcon={icon}>
                            {text}
                        </Button>
                    )}
                    {isMobile && <IconButton className={classes.mobile}>{icon}</IconButton>}
                </Link>
            ) : (
                <>
                    {!isMobile && (
                        <Button
                            onClick={onClick}
                            className={isMobile ? classes.mobile : classes.root}
                            startIcon={icon}>
                            {text}
                        </Button>
                    )}
                    {isMobile && <IconButton className={classes.mobile}>{icon}</IconButton>}
                </>
            )}
        </>
    );
}

SuccessButton.propTypes = {
    fontSize: PropTypes.string,
    height: PropTypes.string,
    icon: PropTypes.element,
    rm: PropTypes.string,
    lm: PropTypes.string,
    tm: PropTypes.string,
    bm: PropTypes.string,
    path: PropTypes.string,
    onClick: PropTypes.any,
    text: PropTypes.string,
    width: PropTypes.string,
    isMobile: PropTypes.bool
};

export default SuccessButton;
