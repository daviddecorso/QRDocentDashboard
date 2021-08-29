import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

function SuccessButton({ width, height, text, fontSize, lm, rm, icon, path, onClick }) {
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
        }
    });

    const classes = successButtonStyle();
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

SuccessButton.propTypes = {
    fontSize: PropTypes.string,
    height: PropTypes.string,
    icon: PropTypes.element,
    rm: PropTypes.string,
    lm: PropTypes.string,
    path: PropTypes.string,
    onClick: PropTypes.function,
    text: PropTypes.string,
    width: PropTypes.string
};

export default SuccessButton;
