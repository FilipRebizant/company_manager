import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { Label } from "../Label";
import { Input } from "../Input";

class AddMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItems: {},
            name: '',
            code: '',
            quantity: '',
            usedAt: '',
            additionalInfo: ''
        }
    }

    resetInputFields = () => {
        this.setState({
            currentItems: {},
            name: '',
            code: '',
            quantity: '',
            usedAt: '',
            additionalInfo: ''
        })
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const {name, code, quantity, usedAt, additionalInfo} = this.state;
        const newItem = {
            name: name,
            code: code,
            quantity: quantity,
            usedAt: usedAt,
            additionalInfo: additionalInfo,
            pushed: false
        };
        let currentMaterialList = localStorage.getItem('localMaterialItems');

        if (currentMaterialList === null) {
            currentMaterialList = {};
        } else {
            currentMaterialList = JSON.parse(currentMaterialList);
        }

        if (!currentMaterialList[newItem.usedAt]) {
            currentMaterialList[newItem.usedAt] = [];
        }

        if (this.state.usedAt !== '') {
            currentMaterialList[newItem.usedAt].push(newItem);
            localStorage.setItem("localMaterialItems", JSON.stringify(currentMaterialList));

            this.resetInputFields();

        }

        this.props.updateList();
    };
//163
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
                    <Label for="usedAt"/>
                    <Input type="date" name="usedAt" value={this.state.usedAt} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <Label for="additionalInfo"/>
                    <Input name="additionalInfo" value={this.state.additionalInfo} onChange={this.handleChange} />
                </div>

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
