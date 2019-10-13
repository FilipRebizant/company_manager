import React, {Component} from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Label } from "../atoms/Label";
import { Input } from "../atoms/Input";

class AddCommission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpened: false,
            id: '',
            name: '',
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

    componentDidMount() {
        this.getOpenedCommissions();
    }

    getOpenedCommissions = () => {
        const localOpenedCommissions = localStorage.getItem('localOpenedCommissions');
        const parsedCommissions = JSON.parse(localOpenedCommissions);
        let lastId = 0;

        if (parsedCommissions) {
            lastId = parsedCommissions[parsedCommissions.length-1].id + 1;
        }

        this.setState({
            id: lastId
        });
    };

    toggleModal = () => {
        this.setState({
            modalOpened: !this.state.modalOpened
        });
    };

    handleFormSubmit = () => {
        const {id, name, town, street, houseNumber, createdAt} = this.state;
        const newItem = {
            id: id,
            name: name,
            town: town,
            street: street,
            houseNumber: houseNumber,
            createdAt: createdAt,
            material: {},
            reports: {},
            tasks: {},
            pushed: false
        };
        let localOpenedCommissions = localStorage.getItem('localOpenedCommissions');

        if (localOpenedCommissions === null) {
            localOpenedCommissions = [];
        } else {
            localOpenedCommissions = JSON.parse(localOpenedCommissions);
        }

        if (this.state.valid === true) {
            localOpenedCommissions.push(newItem);
            localStorage.setItem("localOpenedCommissions", JSON.stringify(localOpenedCommissions));

            this.resetInputFields();
        }
        this.getOpenedCommissions();
        this.props.updateList();
    };

    resetInputFields = () => {
        this.setState({
            name: '',
            town: '',
            street: '',
            houseNumber: '',
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
