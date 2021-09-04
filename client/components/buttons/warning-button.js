import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

function WarningButton({ width, height, text, fontSize, lm, rm, icon, path, onClick }) {
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
            width: width,
            height: height,
            fontSize: fontSize
        }
    });

    const classes = warningButtonStyle();
    return (
        <>
            {path ? (
                <Link to={path} style={{ textDecoration: 'none' }}>
                    <Button className={classes.root} startIcon={icon}>
                        {text}
                    </Button>
                </Link>
            ) : (
                <Button onClick={onClick} className={classes.root} startIcon={icon}>
                    {text}
                </Button>
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
    path: PropTypes.string,
    onClick: PropTypes.any,
    text: PropTypes.string,
    width: PropTypes.string
};

export default WarningButton;
