import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

function NavButton({ text, path, isHover, icon, setPage }) {
    const activeStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'end',
        paddingLeft: '92px',
        width: '289px'
    };

    const nonActiveStyle = {
        justifyContent: 'end',
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
                    onClick={onClick}
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
    text: PropTypes.string
};

export default NavButton;
