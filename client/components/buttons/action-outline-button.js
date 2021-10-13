import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

function ActionOutlineButton({
    width,
    height,
    text,
    fontSize,
    lm,
    rm,
    tm,
    bw,
    icon,
    path,
    onClick
}) {
    const buttonStyle = makeStyles({
        root: {
            backgroundColor: 'rgba(0,0,0,0)',
            border: 'solid #B128F1',
            borderWidth: bw,
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
                backgroundColor: '#B128F1'
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

ActionOutlineButton.propTypes = {
    fontSize: PropTypes.string,
    height: PropTypes.string,
    icon: PropTypes.element,
    rm: PropTypes.string,
    lm: PropTypes.string,
    tm: PropTypes.string,
    bw: PropTypes.string,
    onClick: PropTypes.any,
    path: PropTypes.string,
    text: PropTypes.string,
    width: PropTypes.string
};

export default ActionOutlineButton;
