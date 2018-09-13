import React, { Component } from 'react';
import './App.css';
import Layout from './Layout';
import { Route, Switch} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
      <Route path="/" component={Layout} />
      </Switch>
      </div>
    );
  }
}

export default App;
