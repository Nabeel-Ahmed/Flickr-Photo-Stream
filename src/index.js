import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";

const Routes  = () =>  (
    <Router>
        <Route path="/" component={App} />
    </Router>
);

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
