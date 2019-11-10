import React, { Component } from 'react';
import {commissionService, taskService} from "../../_services";

class NotificationBanner extends Component {
    state = {
        isDisconnected: false
    }

    componentDidMount() {
        this.handleConnectionChange();
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
                            taskService.syncLocalTasks();
                            // TODO: Dodać synchronizacje materialu
                            // TODO: Dodać synchronizacje raportow
                            // TODO: Zaktualizować state po synchronizacji
                            // commissionService.syncLocalChanges();
                            this.updateCommissionsList(response.commissions);
                            this.setState({isDisconnected: false}, () => {
                                return clearInterval(webPing)
                            });
                        }))
                        .catch(() => this.setState({isDisconnected: true}))
                }, 2000);
            return;
        }

        return this.setState({ isDisconnected: true });
    };

    updateCommissionsList = (commissions) => {
        localStorage.removeItem('localOpenedCommissions');
        localStorage.setItem('localOpenedCommissions', JSON.stringify(commissions));
    }

    pushLocalChanges = () => {
        commissionService.pushLocalChanges()
    }

    render() {
        const { isDisconnected } = this.state;

        if (isDisconnected) {
            return (
                <div className="alert alert-danger">
                    You are offline
                    <div>
                        <button onClick={commissionService.syncLocalChanges} className="btn btn-primary">Sync me</button>
                    </div>
                </div>
            );
        }
        return (<div></div>);
    }
}

export { NotificationBanner }
