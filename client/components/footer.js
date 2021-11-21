import { makeStyles } from '@material-ui/core';
import React from 'react';

const pageStyles = {
    footer: {
        backgroundColor: '#E1E1E1',
        height: '50px',
        color: 'black',
        '& a': {
            color: '#494f5c'
        }
    },

    footerText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
};

function Footer() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <div className={classes.footerText}>
                <p>© 2021</p>
                <a href="/privacy">Privacy</a>
                <a href="/contact">Contact</a>
                <a href="/login">Login</a>
                <a href="/qr/app">Download App</a>
            </div>
        </div>
    );
}

export default Footer;
