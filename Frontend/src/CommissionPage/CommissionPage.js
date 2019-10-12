import React, {Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { MaterialList } from "../_components/Material/MaterialList";
import { AddMaterial } from "../_components/Material/AddMaterial";
import { AddDayReport } from "../_components/DayReports/AddDayReport";
import { ReportsTable } from "../_components/DayReports/ReportsTable";
import { AddTask } from "../_components/Task/AddTask";
import { TasksList } from "../_components/Task/TasksList";

class CommissionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material: null,
            reports: null,
            tasks: null,
            commissionName: null,
            commissionId: '',
            activeTab: "1"
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
        this.getItems(this.state.commissionId);
        this.renderMaterialList();
    };

    updateTaskList = () => {
        console.log('List updated');
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
       this.getItems(id);

       this.setState({
           commissionId: id
       });
    };

    getItems = (id) => {
        const material = JSON.parse(localStorage.getItem(`commission${id}material`));
        const reports = JSON.parse(localStorage.getItem('localDayReports'));
        const tasks = JSON.parse(localStorage.getItem('localTasks'));

        this.setState({
            material: material,
            reports: reports,
            tasks: tasks
        });
    };

    renderMaterialList = () => {
        const { material } = this.state;
        if (material) {
            return Object.keys(material).map((key) => {
                return <MaterialList
                    key={key}
                    name='reports'
                    date={key}
                    items={material}
                />
            });
        }
    };


    renderReportsList = () => {
        const { reports } = this.state;
        if (reports) {
            return Object.keys(reports).map((key) => {
                return <ReportsTable
                    key={key}
                    name='reports'
                    date={key}
                    items={reports}
                />
            });
        }
    };

    renderTaskList = () => {
        const { tasks } = this.state;
        if (tasks) {
            return Object.keys(tasks).map((key) => {
                return <TasksList
                    key={key}
                    name='tasks'
                    date={key}
                    items={tasks}
                />
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
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeTab === "3"} onClick={this.toggleTab("3")} role="tab" >
                            Tasks
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

                    <MDBTabPane tabId="3" role="tabpanel">
                        <MDBRow>
                            <MDBCol md="12">
                                <AddTask updateTaskList={this.updateTaskList}/>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBContainer>
                                    <h3 className="py-4">Tasks</h3>
                                    {this.renderTaskList()}
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
