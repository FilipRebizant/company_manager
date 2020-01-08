import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { HomePage } from './HomePage';
import { CommissionPage } from "./CommissionPage";
import { LoginPage } from "./LoginPage";
import { Navigation } from "./_components/Navigation";
import { NotificationBanner } from "./_components/NotificationBanner";
import {materialService, reportService, storageService, taskService} from "./_services";
import { PrivateRoute } from "./_components/Auth";
import { UsersPage } from "./UsersPage/UsersPage";

class App extends Component {
    _isMounted = false;
    state = {
        isDisconnected: false,
        needToUpdate: false
    }

    componentDidMount() {
        this._isMounted = true;
        window.addEventListener('online', this.handleConnectionChange);
        window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('online', this.handleConnectionChange);
        window.removeEventListener('offline', this.handleConnectionChange);
    }

    handleConnectionChange = () => {
            const condition = navigator.onLine ? 'online' : 'offline';
            if (condition === 'online') {

                if (this._isMounted) {
                    this.setState({isDisconnected: false});
                }

                if (typeof storageService.getItems('notSentMaterials') === 'object') {
                    materialService.syncLocalMaterials();
                }

                if (typeof storageService.getItems('notSentReports') === 'object') {
                    reportService.syncLocalReports();
                }

                if (typeof storageService.getItems('notSentTasks') === 'object') {
                    taskService.syncLocalTasks();
                }

            } else {
                if (this._isMounted) {
                    this.setState({isDisconnected: true});
                }
            }
    };

    render () {
        return (
            <div className="App">
                <Router>
                    <Navigation/>
                    <NotificationBanner isDisconnected={this.state.isDisconnected} tryToSync={this.handleConnectionChange}/>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/commission/:id" component={CommissionPage} />
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRoute path="/users" component={UsersPage} />
                    </Switch>
                </Router>
                <footer className="background-wrapper"></footer>
            </div>
        );
    }
}

export default App;
