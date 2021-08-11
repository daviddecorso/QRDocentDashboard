import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Analytics from './routes/analytics';
import { CssBaseline } from '@material-ui/core';
import Exhibits from './routes/exhibits';
import IndexRoute from './routes/home';
import NavBar from './components/nav-bar';
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
                    <NavBar />
                    <Switch>
                        <Route exact path="/">
                            <IndexRoute />
                        </Route>
                        <Route exact path="/analytics">
                            <Analytics />
                        </Route>
                        <Route exact path="/exhibits">
                            <Exhibits />
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
