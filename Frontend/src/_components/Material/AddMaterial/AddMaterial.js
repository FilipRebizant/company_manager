import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { Label } from "../../atoms/Label/index";
import { Input } from "../../atoms/Input/index";
import {getCommissionId, getCurrentDate} from "../../../_helpers";

class AddMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commissionId: '',
            name: '',
            code: '',
            quantity: '',
            date: '',
            additionalInfo: ''
        }
    }

    validate = (item) => {
        return true;
    };

    resetInputFields = () => {
        this.setState({
            name: '',
            code: '',
            quantity: '',
            date: '',
            additionalInfo: ''
        })
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    addNewItem = (newItem) => {
        let commissions =  JSON.parse(localStorage.getItem('localOpenedCommissions'));

        for (let elem in commissions) {

            if (commissions[elem].id === newItem.commissionId) {
                if (!commissions[elem].material[newItem.date]) {
                    commissions[elem].material[newItem.date] = [];
                }

                commissions[elem].material[newItem.date].push(newItem);
                localStorage.removeItem('localOpenedCommissions');
                localStorage.setItem('localOpenedCommissions', JSON.stringify(commissions));
            }
        }

    };

    getNewItem = () => {
        const {name, code, quantity, additionalInfo} = this.state;
        let { date } = this.state;
        if (date === '') {
            date = getCurrentDate();
        }

        return {
            commissionId: getCommissionId(),
            name: name,
            code: code,
            quantity: quantity,
            date: date,
            additionalInfo: additionalInfo,
            pushed: false
        };
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const newItem = this.getNewItem();

        if (this.validate(newItem)) {
            this.addNewItem(newItem);
            this.resetInputFields();
            this.props.updateList();
        }
    };

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h3 className="text-center py-4">Add Used Material</h3>

                <div className="form-group">
                    <Label for="name"/>
                    <Input name="name" value={this.state.name} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <Label for="code"/>
                    <Input name="code" value={this.state.code} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <Label for="quantity"/>
                    <Input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <Label for="date"/>
                    <Input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <Label for="additionalInfo"/>
                    <Input name="additionalInfo" value={this.state.additionalInfo} onChange={this.handleChange} />
                </div>

                <Input type="hidden" value={this.state.commissionId} />

                <div className="text-center py-4 mt-3">
                    <MDBBtn className="btn btn-outline-blue" type="submit">
                        Send
                        <MDBIcon far icon="paper-plane" className="ml-2"/>
                    </MDBBtn>
                </div>
            </form>
        );
    }
}

export { AddMaterial };
