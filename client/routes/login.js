import { Container, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';

const pageStyles = {
    header: { marginTop: '10vh' }
};

function Login() {
    const useStyles = makeStyles(pageStyles);
    const classes = useStyles();

    return (
        <>
            <div>
                <Container maxWidth="lg">
                    <Typography component="h1" variant="h2" className={classes.header}>
                        Login to Your Account
                    </Typography>
                    <Typography component="h2" variant="h5">
                        Sign in here to view your museum.
                    </Typography>
                    <Link>
                        <Typography component="span" variant="body1">
                            Don&apos;t have an account?
                        </Typography>
                    </Link>
                </Container>
            </div>
        </>
    );
}

export default Login;
