import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { HomePage } from './HomePage';
import { CommissionPage } from "./CommissionPage";
import { Navigation } from "./_components/Navigation";
import { NotificationBanner } from "./_components/NotificationBanner";

function App() {
  return (
    <div className="App">

        <Router>
        <Navigation />
        <NotificationBanner/>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/commission/:id" component={CommissionPage}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
