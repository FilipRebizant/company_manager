import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { Label } from "../../atoms/Label/index";
import { Input } from "../../atoms/Input/index";

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

    componentDidMount() {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);

        this.setState({commissionId: id});
    }

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

    handleFormSubmit = (e) => {
        e.preventDefault();
        const {name, code, quantity, date, additionalInfo, commissionId} = this.state;
        const newItem = {
            commissionId: parseInt(commissionId),
            name: name,
            code: code,
            quantity: quantity,
            date: date,
            additionalInfo: additionalInfo,
            pushed: false
        };
        let currentMaterialList = localStorage.getItem('localMaterialItems');

        if (currentMaterialList === null) {
            currentMaterialList = {};
        } else {
            currentMaterialList = JSON.parse(currentMaterialList);
        }

        if (!currentMaterialList[newItem.date]) {
            currentMaterialList[newItem.date] = [];
        }

        if (this.state.date !== '') {
            currentMaterialList[newItem.date].push(newItem);
            localStorage.setItem("localMaterialItems", JSON.stringify(currentMaterialList));

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