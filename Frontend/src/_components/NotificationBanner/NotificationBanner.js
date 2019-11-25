import React, { Component } from 'react';

class NotificationBanner extends Component {
    render() {
        // const { isDisconnected } = this.props;

        if (this.props.isDisconnected) {
            return (
                <div className="alert alert-danger">
                    You are offline <button onClick={this.props.tryToSync}>Try to sync</button>
                </div>
            );
        }

        return (<div></div>);
    }
}

export { NotificationBanner }
