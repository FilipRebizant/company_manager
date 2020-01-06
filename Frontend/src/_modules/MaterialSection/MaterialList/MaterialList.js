import React, { Component } from 'react';
import { MDBHamburgerToggler, MDBTable, MDBTableHead } from 'mdbreact';
import {materialService, storageService} from "../../../_services";

class MaterialList extends Component {
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

    loadMaterial = (id) => {
        materialService.getMaterials(id)
            .then(response => response.json())
            .then(response => {
                if (response.materials) {
                    let currState = Object.assign({}, this.state);
                    currState.material.dates = response.materials;

                    this.setState(currState);
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
        console.log(storageMaterial);
        if (storageMaterial[commissionId]) {
            this.setState({
                material: storageMaterial[commissionId]
            });
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
                return <div ref={wrapper} className="list-group-wrapper" key={k}>
                        <div className="card-header d-flex justify-content-between">
                            <div>{item[0].createdAt}</div>
                            <MDBHamburgerToggler color="#000000" id={`material-${item[0].createdAt}`} onClick={() => this.toggleVisibilityContent(wrapper)}/>
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
                })
        );
    };
}

export { MaterialList };
