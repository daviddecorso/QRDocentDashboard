import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AddExhibit from './routes/addExhibit';
import Analytics from './routes/analytics';
import { CssBaseline } from '@material-ui/core';
import Exhibits from './routes/exhibits';
import IndexRoute from './routes/home';
import NavBar from './components/nav-bar';
import QrRedirect from './routes/qr-redirect';
import React from 'react';
import ReactDOM from 'react-dom';
import Theme from './styles/theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import './styles/app.css';

export default function App() {
    return (
        <Router>
            <main>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <NavBar />
                            <IndexRoute />
                        </Route>
                        <Route path="/qr">
                            <QrRedirect />
                        </Route>
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
