import {
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';
import IndexRoute from './routes/index';
import React from 'react';
import ReactDOM from 'react-dom';

import './styles/app.css';

export default function App() {
    return (
        <Router>
            <main>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <IndexRoute />
                        </Route>
                    </Switch>
                </div>
            </main>
        </Router>);
}

ReactDOM.render(<App />, document.querySelector('#root'));
