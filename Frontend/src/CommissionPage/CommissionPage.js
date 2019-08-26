import React, {Component} from 'react';

class CommissionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commissions: []
        }
    }

    render() {
        return(
            <h2>Commission</h2>
        );
    }
}

export { CommissionPage };