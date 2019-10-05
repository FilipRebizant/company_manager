import React, {Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { ListGroup } from "../_components/ListGroup";
import { AddMaterial } from "../_components/AddMaterial";
import { AddDayReport } from "../_components/AddDayReport";

class CommissionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material: null,
            reports: null,
            commissionName: null,
            commissionId: '',
            activeTab: "2"
        };
    }

    toggleTab = tab => e => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    updateList = () => {
        this.getItems();
        this.renderMaterialList();
    };

    getCommissionsData = (id) => {
        const localOpenedCommissions = localStorage.getItem('localOpenedCommissions');
        const parsedCommissions = JSON.parse(localOpenedCommissions);

        let commissionName = null;
        parsedCommissions.map((item) => {
            if (item.id === id) {
                commissionName = item.name;
            }
        });

        this.setState({
            commissionName: commissionName
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

    renderMaterialList = () => {
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

    renderReportsList = () => {
        const { reports, commissionId } = this.state;
        if (reports) {
            return Object.keys(reports).map((key) => {
                if (commissionId === reports[key][0].commissionId) {
                    return <ListGroup
                        key={key}
                        usedMaterial={reports[key]}
                    />
                }
            });
        }
    };

    render() {
        const { commissionName } = this.state;

        let pageContent =
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>;

        if (commissionName) {
            pageContent =
            <MDBContainer>
                <h2 className="h2 py-4">{commissionName}</h2>

                <MDBNav className="nav-tabs mt-5">
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeTab === "1"} onClick={this.toggleTab("1")} role="tab" >
                            Material
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeTab === "2"} onClick={this.toggleTab("2")} role="tab" >
                            Working hours
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNav>

                <MDBTabContent activeItem={this.state.activeTab} >

                    <MDBTabPane tabId="1" role="tabpanel">
                        <MDBRow>
                            <MDBCol md="4">
                                <AddMaterial updateList={this.updateList}/>
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBContainer>
                                    <h3 className="py-4">Used Material</h3>
                                    {this.renderMaterialList()}
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBTabPane>

                    <MDBTabPane tabId="2" role="tabpanel">
                        <MDBRow>
                            <MDBCol md="4">
                                <AddDayReport updateList={this.updateList}/>
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBContainer>
                                    <h3 className="py-4">Day Reports</h3>
                                    {this.renderReportsList()}
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBTabPane>

                </MDBTabContent>
            </MDBContainer>
        }

        return (
            pageContent
        );
    }
}

export { CommissionPage };
