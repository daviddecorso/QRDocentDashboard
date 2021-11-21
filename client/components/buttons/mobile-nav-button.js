import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

function NavButton({
    text,
    path,
    isHover,
    icon,
    setPage,
    closeMenu,
    overrideClick,
    overrideFunction
}) {
    const activeStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'left',
        paddingLeft: '60px',
        width: '320px',
        fontSize: '22px'
    };

    const nonActiveStyle = {
        justifyContent: 'left',
        paddingLeft: '60px',
        width: '320px',
        fontSize: '22px'
    };

    const onClick = () => {
        closeMenu();
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

NavButton.propTypes = {
    icon: PropTypes.element,
    isHover: PropTypes.bool,
    path: PropTypes.string,
    setPage: PropTypes.func,
    text: PropTypes.string,
    closeMenu: PropTypes.func,
    overrideClick: PropTypes.bool,
    overrideFunction: PropTypes.func
};

export default NavButton;
