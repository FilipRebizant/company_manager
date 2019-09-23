import React, {Component} from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { ListGroup } from "../_components/ListGroup";
import { AddMaterial } from "../_components/AddMaterial";

class CommissionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material: null,
            name: null,
            commissionId: ''
        };
    }

    updateList = () => {
        this.getItems();
        this.renderList();
    };

    getCommissionsData = (id) => {
        const localOpenedCommissions = localStorage.getItem('localOpenedCommissions');
        const parsedCommissions = JSON.parse(localOpenedCommissions);

        let name = null;
        parsedCommissions.map((item) => {
            if (item.id === id) {
                name = item.name;
            }
        });

        this.setState({
            name: name
        })
    };

    componentDidMount() {
       const url = window.location.href;
       const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
       this.getCommissionsData(id);
       this.getItems();

       this.setState({
           commissionId: id
       });
    };

    getItems = () => {
        let currentMaterialList = localStorage.getItem('localMaterialItems');

        this.setState({
            material: JSON.parse(currentMaterialList)
        });
    };

    renderList = () => {
        const { material, commissionId } = this.state;
        if (material) {
           return Object.keys(material).map((key) => {
               if (commissionId === material[key][0].commissionId) {
                   return <ListGroup
                       key={key}
                       usedMaterial={material[key]}
                   />
               }
          });
       }
    };

    render() {
        const { name } = this.state;

        let pageContent =
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>;

        if (name) {
            pageContent =
            <MDBContainer>
                <h2 className="h2 py-4">{name}</h2>
                <MDBRow>
                    <MDBCol md="4">
                        <AddMaterial updateList={this.updateList}/>
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBContainer>
                            <h3 className="py-4">Used Material</h3>
                            {this.renderList()}
                        </MDBContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        }
        return (
            pageContent
        );
    }
}

export {CommissionPage};
