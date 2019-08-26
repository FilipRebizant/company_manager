import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { HomePage } from './HomePage';
import { CommissionPage } from "./CommissionPage";
import { Navigation } from "./_components/Navigation";


function App() {
  return (
    <div className="App">

        <Router>
        <Navigation />
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/commission/:id" component={CommissionPage}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
