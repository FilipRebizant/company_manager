import React, { Component } from 'react';
import { MDBHamburgerToggler, MDBTable, MDBTableHead } from 'mdbreact';
import { materialService, storageService } from "../../../_services";

class MaterialList extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            material: {
                dates: []
            },
            commissionId: null,
            newMaterial: this.props.newMaterial,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const url = window.location.href;
        const id = parseInt(url.substring(url.lastIndexOf('/') + 1));

        this.setState({
            commissionId: id
        });
        this.loadMaterial(id);
    }

    shouldComponentUpdate(instance, nextProps, nextState) {
        if (instance.newMaterial !== null) {
            this.loadMaterial(this.state.commissionId);
            this.props.resetNewMaterial();
        }

        return true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadMaterial = (id) => {
        materialService.getMaterials(id)
            .then(response => response.json())
            .then(response => {
                if (response.materials) {
                    let currState = Object.assign({}, this.state);
                    currState.material.dates = response.materials;

                    if (this._isMounted){
                        this.setState(currState);
                    }
                    this.saveMaterialLocally();
                } else {
                    this.getMaterialFromStorage();
                }
            }).catch(() => {
                this.getMaterialFromStorage();
            })
    };

    getMaterialFromStorage = () => {
        const storageMaterial = storageService.getItems('localMaterial');
        const { commissionId } = this.state;

        if (storageMaterial[commissionId]) {
            let currState = Object.assign({}, this.state);
            currState.material.dates = storageMaterial[commissionId];

            if (this._isMounted){
                this.setState(currState);
            }
        }
    };

    saveMaterialLocally = () => {
        const { material, commissionId } = this.state;
        let storageMaterial = storageService.getItems('localMaterial');

        storageMaterial[commissionId] = material;
        storageService.setItem(storageMaterial, 'localMaterial');
    };

    getColumnNames = () => {
        return [
            {
                label: '#',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc'
            },
            {
                label: 'Code',
                field: 'last',
                sort: 'asc'
            },
            {
                label: 'Quantity',
                field: 'handle',
                sort: 'asc'
            }
        ];
    };

    toggleVisibilityContent = (wrapper) => {
        let hiddenPart = wrapper.current.children[1];
        if (hiddenPart.classList.contains("hiddenContent")) {
            hiddenPart.classList.remove("hiddenContent");
        } else {
            hiddenPart.classList.add("hiddenContent");
        }
    };

    render() {
        const { material } = this.state;

        return (
            Object.values(material.dates).map((item, k) => {
                let wrapper = React.createRef();
                let createdAt = item[0] ? item[0].createdAt : '';
                return (
                    <div ref={wrapper} className="list-group-wrapper" key={k}>
                        <div className="card-header d-flex justify-content-between">
                            <div>{createdAt}</div>
                            <MDBHamburgerToggler color="#000000" id={`material-${createdAt}`} onClick={() => this.toggleVisibilityContent(wrapper)}/>
                        </div>
                        <div className="hiddenContentContainer hiddenContent">
                            <MDBTable responsive>
                                <MDBTableHead columns={this.getColumnNames()}/>
                                <tbody>
                                {
                                    Object.values(item).map((i, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{(key)+1}</td>
                                                <td>{i.name}</td>
                                                <td>{i.code}</td>
                                                <td>{i.quantity}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </MDBTable>
                        </div>
                    </div>
                );
            })
        );
    };
}

export { MaterialList };
