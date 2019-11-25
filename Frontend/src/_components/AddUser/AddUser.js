import React, {Component} from 'react';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpened: false,
            id: '',
            name: '',
            postCode: '',
            town: '',
            street: '',
            houseNumber: '',
            // createdAt: this.getCurrentDate(),
            // pushed: false,
            // valid: true
        }
    }

    render() {
        return (
            <div>
                <h2>Add User</h2>
            </div>
        );
    }
}

export { AddUser };
