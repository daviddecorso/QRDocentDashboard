import React, { useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AddExhibit from './routes/addExhibit';
import Analytics from './routes/analytics';
import { CssBaseline } from '@material-ui/core';
import EditExhibit from './routes/editExhibit';
import Exhibits from './routes/exhibits';
import IndexRoute from './routes/home';
import isLogin from './util/auth';
import Landing from './routes/landing';
import Login from './routes/login';
import NavBar from './components/nav-bar';
import PropTypes from 'prop-types';
import QrRedirect from './routes/qr-redirect';
import ReactDOM from 'react-dom';
import Theme from './styles/theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import './styles/app.css';

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
                            <NavBar />
                            <IndexRoute />
                        </PrivateRoute>
                        <Route exacy path="/login">
                            <Login setExhibits={setExhibits} />
                        </Route>
                        <Route path="/qr">
                            <QrRedirect />
                        </Route>
                        <PrivateRoute exact path="/analytics">
                            <NavBar />
                            <Analytics />
                        </PrivateRoute>
                        <PrivateRoute exact path="/exhibits">
                            <NavBar />
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
                            <NavBar />
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
