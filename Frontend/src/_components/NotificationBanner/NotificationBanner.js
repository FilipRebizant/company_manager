import React, { Component } from 'react';
import { commissionService } from "../../_services";

class NotificationBanner extends Component {

    render() {
        const { isDisconnected } = this.props;

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
