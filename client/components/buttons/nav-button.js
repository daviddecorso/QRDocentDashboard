import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

function MobileNavButton({ text, path, isHover, icon, setPage, overrideClick, overrideFunction }) {
    const activeStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'left',
        paddingLeft: '92px',
        width: '289px'
    };

    const nonActiveStyle = {
        justifyContent: 'left',
        paddingLeft: '92px',
        width: '289px'
    };

    const onClick = () => {
        setPage(text);
    };

    return (
        <>
            <Link to={path} style={{ textDecoration: 'none' }}>
                <Button
                    onClick={overrideClick ? overrideFunction : onClick}
                    size="large"
                    startIcon={icon}
                    style={isHover === true ? activeStyle : nonActiveStyle}>
                    {text}
                </Button>
            </Link>
        </>
    );
}

MobileNavButton.propTypes = {
    icon: PropTypes.element,
    isHover: PropTypes.bool,
    path: PropTypes.string,
    setPage: PropTypes.func,
    text: PropTypes.string,
    overrideClick: PropTypes.bool,
    overrideFunction: PropTypes.func
};

export default MobileNavButton;
