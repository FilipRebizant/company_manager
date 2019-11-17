import React, {Component} from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Label } from "../atoms/Label";
import { Input } from "../atoms/Input";
import {commissionService, storageService} from "../../_services";

class AddCommission extends Component {
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
            createdAt: this.getCurrentDate(),
            pushed: false,
            valid: true
        }
    }

    getCurrentDate = () => {
        let today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const hour = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const seconds = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();

        return `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;
    };

    toggleModal = () => {
        this.setState({
            modalOpened: !this.state.modalOpened
        });
    };

    handleFormSubmit = () => {
        const {name, postCode, town, street, houseNumber, createdAt} = this.state;
        const newItem = {
            name: name,
            postCode: postCode,
            town: town,
            street: street,
            houseNumber: houseNumber,
            createdAt: createdAt,
            material: {},
            reports: {},
            tasks: {},
            pushed: false
        };

        if (this.state.valid === true) {
            commissionService.createCommission(newItem)
                .then(response => response.json()
                .then((response) => {
                    console.log(response);
                    if (!response.errors) {
                        newItem.id = response.id;
                        storageService.addItem(newItem, 'localOpenedCommissions');
                        this.props.addItem(newItem);
                    } else {
                        storageService.addItem(newItem, 'notSentCommissions');
                        this.props.updateList();
                    }
                }))
                .catch((e) => {
                    storageService.addItem(newItem, 'notSentCommissions');
                    this.props.updateList();
                });

            this.resetInputFields();
        }

    };

    resetInputFields = () => {
        this.setState({
            name: '',
            town: '',
            street: '',
            houseNumber: '',
            postCode: '',
            createdAt: this.getCurrentDate()
        })
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <MDBContainer>
                <MDBBtn color="primary" onClick={this.toggleModal}>Add Commission</MDBBtn>
                <MDBModal isOpen={this.state.modalOpened} toggle={this.toggleModal}>
                    <MDBModalHeader className="justify-content-center" toggle={this.modalOpened}>Add Commission</MDBModalHeader>
                    <MDBModalBody>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <Label for="name"/>
                                <Input name="name" value={this.state.name} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <Label for="town"/>
                                <Input name="town" value={this.state.town} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <Label for="street"/>
                                <Input name="street" value={this.state.street} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <Label for="postCode"/>
                                <Input name="postCode" value={this.state.postCode} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <Label for="houseNumber"/>
                                <Input name="houseNumber" value={this.state.houseNumber} onChange={this.handleChange}/>
                            </div>

                            <Input type="hidden" value={this.state.createdAt} />
                            <Input type="hidden" value={this.state.id} />
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn className="btn btn-outline-red" onClick={this.toggleModal}>Close</MDBBtn>
                        <MDBBtn className="btn btn-outline-blue" onClick={this.handleFormSubmit}>Add Commission</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export { AddCommission }
