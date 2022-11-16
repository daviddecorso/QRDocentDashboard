/* eslint-disable sort-imports */
import React, { useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AddExhibit from './routes/addExhibit';
import Analytics from './routes/analytics';
import Contact from './routes/contact';
import { CssBaseline } from '@material-ui/core';
import EditExhibit from './routes/editExhibit';
import Exhibits from './routes/exhibits';
import IndexRoute from './routes/home';
import isLogin from './util/auth';
import Landing from './routes/landing';
import Login from './routes/login';
import NavBar from './components/nav-bar';
import PageNotFound from './routes/404';
import Privacy from './routes/privacy';
import PropTypes from 'prop-types';
import QrRedirect from './routes/qr-redirect';
import ReactDOM from 'react-dom';
import Theme from './styles/theme.js';
import { initializeApp } from 'firebase/app';
import { ThemeProvider } from '@material-ui/core/styles';
import './styles/app.css';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,

    authDomain: process.env.AUTH_DOMAIN,

    projectId: process.env.PROJECT_ID,

    storageBucket: process.env.STORAGE_BUCKET,

    messagingSenderId: process.env.SENDER_ID,

    appId: process.env.APP_ID,

    measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
console.log(app.name);

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (isLogin()) {
                    return children;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location }
                            }}
                        />
                    );
                }
            }}
        />
    );
}

PrivateRoute.propTypes = {
    children: PropTypes.any
};

export default function App() {
    const [exhibits, setExhibits] = useState([]);
    const [snackbarText, setSnackbarText] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    return (
        <Router>
            <main>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Landing />
                        </Route>
                        <PrivateRoute exact path="/home">
                            <NavBar currentPage={'Home'} />
                            <IndexRoute />
                        </PrivateRoute>
                        <Route exact path="/login">
                            <Login setExhibits={setExhibits} />
                        </Route>
                        <Route exact path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/qr">
                            <QrRedirect />
                        </Route>
                        <Route exact path="/privacy">
                            <Privacy />
                        </Route>
                        <PrivateRoute exact path="/analytics">
                            <NavBar currentPage={'Analytics'} />
                            <Analytics />
                        </PrivateRoute>
                        <PrivateRoute exact path="/exhibits">
                            <NavBar currentPage={'Exhibits'} />
                            <Exhibits
                                exhibits={exhibits}
                                setExhibits={setExhibits}
                                openSuccess={openSuccess}
                                setOpenSuccess={setOpenSuccess}
                                snackbarText={snackbarText}
                                setSnackbarText={setSnackbarText}
                            />
                        </PrivateRoute>
                        <PrivateRoute exact path="/exhibits/add">
                            <AddExhibit
                                exhibits={exhibits}
                                setExhibits={setExhibits}
                                setOpenSuccess={setOpenSuccess}
                                setSnackbarText={setSnackbarText}
                            />
                        </PrivateRoute>
                        <PrivateRoute path="/exhibits/edit/:id">
                            <EditExhibit
                                exhibits={exhibits}
                                setExhibits={setExhibits}
                                setOpenSuccess={setOpenSuccess}
                                setSnackbarText={setSnackbarText}
                            />
                        </PrivateRoute>
                        <Route path="*">
                            <PageNotFound />
                        </Route>
                    </Switch>
                </div>
            </main>
        </Router>
    );
}

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,

    document.querySelector('#root')
);
