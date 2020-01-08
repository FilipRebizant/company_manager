import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { Label } from "../../../_components/atoms/Label/index";
import { Input } from "../../../_components/atoms/Input/index";
import { getCommissionId, getCurrentDate } from "../../../_helpers/index";
import { materialService } from "../../../_services/index";
import Spinner from "../../../_components/Spinner/Spinner";

class AddMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            code: '',
            quantity: '',
            createdAt: '',
            additionalInfo: '',
            isShowingAlert: false,
            alert: null,
            alertStatus: '',
            isShowingLoader: false
        }
    }

    validate = (item) => {
        if (item.name === "") {
            this.setState({
                isShowingAlert: true,
                alert: 'Name can not be empty',
                alertStatus: 'danger'
            });

            return false;
        }

        if (item.code === "") {
            this.setState({
                isShowingAlert: true,
                alert: 'Code can not be empty',
                alertStatus: 'danger'
            });

            return false;
        }

        if (item.quantity === "") {
            this.setState({
                isShowingAlert: true,
                alert: 'Quantity can not be empty',
                alertStatus: 'danger'
            });

            return false;
        }

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
        this.setState({
            isShowingAlert: false,
            isShowingLoader: true,
        });

        materialService.pushMaterial(newItem)
            .then(response => response.json())
            .then((response => {
                if (response.id) {
                    newItem.id = response.id;

                    this.setState({
                        isShowingAlert: true,
                        alert: 'Material sent successfully',
                        alertStatus: 'success',
                        isShowingLoader: false
                    });

                    this.resetInputFields();
                    const event = new CustomEvent('newMaterialEvent', newItem);
                    window.dispatchEvent(event);
                    this.props.updateMaterialList(newItem);
                } else {
                    this.setState({
                        alert: 'Couldn\'t connect to server, material has been saved locally',
                        alertStatus: 'danger',
                        isShowingAlert: true,
                        isShowingLoader: false
                    });
                    this.addToNotSent(newItem);
                }
            }))
            .catch((e) => {
                this.setState({
                    alert: 'Couldn\'t connect to server, material has been saved locally',
                    alertStatus: 'danger',
                    isShowingAlert: true,
                    isShowingLoader: false
                });
                this.addToNotSent(newItem);
            });
    };

    addToNotSent = (newMaterial) => {
        let currentNotSentMaterials = JSON.parse(localStorage.getItem('notSentMaterials'));

        if (!currentNotSentMaterials) {
            currentNotSentMaterials = {};
        }
        if (!currentNotSentMaterials[newMaterial.commissionId]) {
            currentNotSentMaterials[newMaterial.commissionId] = [];
        }
        currentNotSentMaterials[newMaterial.commissionId].push(newMaterial);
        localStorage.setItem('notSentMaterials', JSON.stringify(currentNotSentMaterials));
        this.props.updateTaskList(newMaterial);
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
        }
    };

    render() {
        const { isShowingAlert, alertStatus, alert, isShowingLoader } = this.state;
        let alertContainer, spinnerContainer;

        if (isShowingLoader) {
            spinnerContainer = <Spinner notFullHeight/>
        }

        if (isShowingAlert) {
            alertContainer = <div className={`alert alert-${alertStatus}`}>{alert}</div>;
        }

        return (
            <div>

                <form onSubmit={this.handleFormSubmit}>
                    <h3 className="text-center py-4">Add Used Material</h3>
                    { alertContainer }
                    { spinnerContainer }
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

            </div>
        );
    }
}

export { AddMaterial };
