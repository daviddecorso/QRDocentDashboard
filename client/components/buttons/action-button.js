import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

function ActionButton({ width, height, text, fontSize, lm, rm, tm, icon, path, onClick }) {
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
    return (
        <>
            {path ? (
                <Link to={path} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" className={classes.root} startIcon={icon}>
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

ActionButton.propTypes = {
    fontSize: PropTypes.string,
    height: PropTypes.string,
    icon: PropTypes.element,
    rm: PropTypes.string,
    lm: PropTypes.string,
    tm: PropTypes.string,
    onClick: PropTypes.any,
    path: PropTypes.string,
    text: PropTypes.string,
    width: PropTypes.string
};

export default ActionButton;
