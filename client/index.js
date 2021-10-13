import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AddExhibit from './routes/addExhibit';
import Analytics from './routes/analytics';
import AuthenticationComponent from './components/authenticator';
import { CssBaseline } from '@material-ui/core';
import EditExhibit from './routes/editExhibit';
import Exhibits from './routes/exhibits';
import IndexRoute from './routes/home';
import Login from './routes/login';
import NavBar from './components/nav-bar';
import PropTypes from 'prop-types';
import QrRedirect from './routes/qr-redirect';
import React from 'react';
import ReactDOM from 'react-dom';
import Theme from './styles/theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import useAuth from './contexts/use-auth';
import './styles/app.css';

function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (auth.user) {
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
    children: PropTypes.object
};

export default function App() {
    return (
        <AuthenticationComponent>
            <Router>
                <main>
                    <div>
                        <Switch>
                            <Route exact path="/">
                                <NavBar />
                                <IndexRoute />
                            </Route>
                            <Route exacy path="/login">
                                <Login />
                            </Route>
                            <PrivateRoute path="/qr">
                                <QrRedirect />
                            </PrivateRoute>
                            <Route exact path="/analytics">
                                <NavBar />
                                <Analytics />
                            </Route>
                            <Route exact path="/exhibits">
                                <NavBar />
                                <Exhibits />
                            </Route>
                            <Route exact path="/exhibits/add">
                                <NavBar />
                                <AddExhibit />
                            </Route>
                            <Route exact path="/exhibits/edit">
                                <NavBar />
                                <EditExhibit />
                            </Route>
                        </Switch>
                    </div>
                </main>
            </Router>
        </AuthenticationComponent>
    );
}

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,

    document.querySelector('#root')
);
