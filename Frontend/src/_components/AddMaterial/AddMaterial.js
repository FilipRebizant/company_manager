import React, {Component} from 'react';
import {MDBBtn, MDBIcon} from 'mdbreact';

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

        currentMaterialList[newItem.usedAt].push(newItem);

        localStorage.setItem("localMaterialItems", JSON.stringify(currentMaterialList));
    };

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <p className="h4 text-center py-4">Add Used Material</p>

                <label
                    htmlFor="name"
                    className="grey-text font-weight-light"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    onChange={this.handleChange}
                />
                <br/>

                <label
                    htmlFor="code"
                    className="grey-text font-weight-light"
                >
                    Code
                </label>

                <input
                    type="text"
                    id="code"
                    name="code"
                    className="form-control"
                    onChange={this.handleChange}
                />
                <br/>

                <label
                    htmlFor="quantity"
                    className="grey-text font-weight-light"
                >
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-control"
                    onChange={this.handleChange}
                />
                <br/>

                <label
                    htmlFor="usedAt"
                    className="grey-text font-weight-light"
                >
                    Used at
                </label>

                <input
                    type="date"
                    id="usedAt"
                    name="usedAt"
                    className="form-control"
                    onChange={this.handleChange}
                />
                <br/>

                <label htmlFor="additionalInfo" className="grey-text font-weight-light">
                    Additional Info
                </label>
                <input
                    type="text"
                    id="additionalInfo"
                    name="additionalInfo"
                    className="form-control"
                    onChange={this.handleChange}
                />

                <div className="text-center py-4 mt-3">
                    <MDBBtn className="btn btn-outline-purple" type="submit">
                        Send
                        <MDBIcon far icon="paper-plane" className="ml-2"/>
                    </MDBBtn>
                </div>
            </form>
        );
    }
}

export {AddMaterial};