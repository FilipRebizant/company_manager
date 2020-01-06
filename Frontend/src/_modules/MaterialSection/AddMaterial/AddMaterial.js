import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { Label } from "../../../_components/atoms/Label/index";
import { Input } from "../../../_components/atoms/Input/index";
import { getCommissionId, getCurrentDate } from "../../../_helpers/index";
import { materialService, storageService} from "../../../_services/index";

class AddMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commissionId: '',
            name: '',
            code: '',
            quantity: '',
            createdAt: '',
            additionalInfo: '',
            buttonDisabled: true
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
            createdAt: '',
            additionalInfo: ''
        })
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    addNewItem = (newItem) => {
        materialService.pushMaterial(newItem)
            .then((response => {
                console.log(response);
                if (response.ok) {
                    newItem.id = response.id;
                } else {
                    this.saveLocally(newItem);
                }
            }))
            .catch((e) => {
                this.saveLocally(newItem);
            });


        const material = storageService.getItems('localMaterial');

        material.forEach(function (item) {

        });

        // let commissions =  JSON.parse(localStorage.getItem('localOpenedCommissions'));
        //
        // for (let elem in commissions) {
        //     if (commissions[elem].id === newItem.commissionId) {
        //         if (!commissions[elem].material[newItem.createdAt]) {
        //             commissions[elem].material[newItem.createdAt] = [];
        //         }
        //
        //         commissions[elem].material[newItem.createdAt].push(newItem);
        //         localStorage.removeItem('localOpenedCommissions');
        //         localStorage.setItem('localOpenedCommissions', JSON.stringify(commissions));
        //     }
        // }
    };

    saveLocally = (newMaterial) => {
        storageService.addItem(newMaterial, 'notSentMaterials');
    };

    prepareNewItem = () => {
        const {name, code, quantity} = this.state;
        let { createdAt } = this.state;
        if (createdAt === '') {
            createdAt = getCurrentDate();
        }

        return {
            commissionId: getCommissionId(),
            name: name,
            code: code,
            quantity: quantity,
            createdAt: createdAt
        };
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const newItem = this.prepareNewItem();

        if (this.validate(newItem)) {
            this.addNewItem(newItem);
            this.resetInputFields();
            this.props.updateMaterialList();
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
                    <Label for="createdAt"/>
                    <Input type="date" name="createdAt" value={this.state.createdAt} onChange={this.handleChange} />
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
