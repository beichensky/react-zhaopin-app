import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Auth from 'pages/auth';
import Main from 'pages/main';
import styles from './App.module.less';

const App: React.FC = () => {

    return (
        <div className={ styles.App }>
            <Router>
                <Switch>
                    <Route path="/auth" component={ Auth } />
                    <Route path="/" component={ Main } />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
