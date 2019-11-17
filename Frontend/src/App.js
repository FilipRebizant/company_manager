import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { HomePage } from './HomePage';
import { CommissionPage } from "./CommissionPage";
import { Navigation } from "./_components/Navigation";
import { NotificationBanner } from "./_components/NotificationBanner";
import { commissionService, taskService } from "./_services";

class App extends Component {

    state = {
        isDisconnected: false,
        needToUpdate: false
    }

    componentDidMount() {
        // this.handleConnectionChange();
        window.addEventListener('online', this.handleConnectionChange);
        window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.handleConnectionChange);
        window.removeEventListener('offline', this.handleConnectionChange);
    }

    handleConnectionChange = () => {
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
            const webPing = setInterval(
                () => {
                    commissionService.getAll()
                        .then(response => response.json())
                        .then((response => {
                            // taskService.syncLocalTasks();
                            commissionService.syncLocalChanges();
                            // TODO: Dodać synchronizacje materialu
                            // TODO: Dodać synchronizacje raportow
                            // TODO: Zaktualizować state po synchronizacji
                            this.setState({isDisconnected: false}, () => {
                                this.refresh();
                                return clearInterval(webPing)
                            });
                        }))
                        .catch(() => this.setState({isDisconnected: true, needToUpdate: false}))
                }, 2000);
            return;
        }

        return this.setState({ isDisconnected: true });
    };

    refresh() {
        commissionService.getAll()
            .then(response => response.json())
            .then((response => {
                localStorage.removeItem('localOpenedCommissions');
                localStorage.setItem('localOpenedCommissions', JSON.stringify(response.commissions));

                this.setState({
                    needToUpdate: true
                })
            }));
    }

    render () {
        return (
            <div className="App">
                <Router>
                    <Navigation/>
                    <NotificationBanner isDisconnected={this.state.isDisconnected}/>
                    <Switch>
                        <Route exact path="/" component={() => <HomePage needToUpdate={this.state.needToUpdate}/>}/>
                        <Route path="/commission/:id" component={ () =>
                            <CommissionPage needToUpdate={this.state.needToUpdate} updateList={this.refresh}
                        />} />
                    </Switch>
                </Router>
            </div>
        );
        }

}
export default App;
