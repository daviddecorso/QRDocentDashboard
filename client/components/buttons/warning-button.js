import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
function WarningButton({
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
    const warningButtonStyle = makeStyles({
        root: {
            backgroundColor: '#DE312B',
            color: 'white',
            '&:hover': {
                backgroundColor: '#FF1109',
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
            marginTop: tm,
            marginBottom: bm,
            width: width,
            height: height,
            fontSize: fontSize
        },
        mobile: {
            backgroundColor: '#DE312B',
            color: 'white',
            '&:hover': {
                backgroundColor: '#FF1109',
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

    const classes = warningButtonStyle();
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
                        <Button onClick={onClick} className={classes.root} startIcon={icon}>
                            {text}
                        </Button>
                    )}
                    {isMobile && <IconButton className={classes.mobile}>{icon}</IconButton>}
                </>
            )}
        </>
    );
}

WarningButton.propTypes = {
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

export default WarningButton;
