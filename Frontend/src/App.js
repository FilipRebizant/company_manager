import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { HomePage } from './HomePage';
import { CommissionPage } from "./CommissionPage";
import { LoginPage } from "./LoginPage";
import { Navigation } from "./_components/Navigation";
import { NotificationBanner } from "./_components/NotificationBanner";
import { materialService, storageService, taskService} from "./_services";
import {PrivateRoute} from "./_components/Auth";
import {UsersPage} from "./UsersPage/UsersPage";

class App extends Component {
    _isMounted = false;
    state = {
        isDisconnected: false,
        needToUpdate: false
    }

    componentDidMount() {
        this._isMounted = true;
        if (typeof storageService.getItems('notSentTasks') === 'object') {
            taskService.syncLocalTasks();
            // console.log('sync fire');
            // storageService.setItem(true, 'shouldRenderTasks');
        }
        // this.handleConnectionChange();

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
            console.log(condition);
            if (condition === 'online') {
                console.log('should be fine');
                if (this._isMounted) {
                    this.setState({isDisconnected: false});
                }
                // TODO:: check if there are changes and sync
                // this.refresh();

                if (storageService.getItems('notSentMaterials')) {
                    if (storageService.getItems('notSentMaterials').length) {
                        materialService.syncLocalMaterials().then(
                            // this.refresh()
                        );
                    }
                }
                console.log(typeof storageService.getItems('notSentTasks') === 'object');
                if (typeof storageService.getItems('notSentTasks') === 'object') {
                    taskService.syncLocalTasks();
                    // console.log('sync fire');
                    storageService.setItem(true, 'shouldRenderTasks');
                }
            }

            // TODO: Dodać synchronizacje raportow
            else {
                // TODO:: Ping
                // const webPing = setInterval(
                //     () => {
                //         commissionService.getAll()
                //             .then(() => {
                if (this._isMounted) {
                    this.setState({isDisconnected: true});
                }
                //             })
                //             .catch(() => this.setState({isDisconnected: true}))
                //     }, 2000);
                // return;
            }

    };

    refresh() {
        // commissionService.getAll()
        //     .then(response => response.json())
        //     .then((response => {
        //         localStorage.removeItem('localOpenedCommissions');
        //         localStorage.setItem('localOpenedCommissions', JSON.stringify(response.commissions));

                this.setState({
                    needToUpdate: true
                })
            // }));
    }

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
