import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { MaterialList } from "../_modules/MaterialSection/MaterialList";
import { AddMaterial } from "../_modules/MaterialSection/AddMaterial";
import { AddDayReport } from "../_modules/ReportSection/AddDayReport";
import { ReportsTable } from "../_modules/ReportSection/ReportsTable";
import { AddTask } from "../_modules/TaskSection/AddTask";
import { TasksList } from "../_modules/TaskSection/TasksList";
import { NotSentTask } from "../_modules/TaskSection/NotSentTask";
import { storageService } from "../_services";
import { CostsSummary } from "../_modules/CostSummarySection/CostsSummary/CostsSummary";

class CommissionPage extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            newTask: null,
            newMaterial: null,
            newReport: null,
            tasks: {
                Todo: []
            },
            commissionName: null,
            commissionId: '',
            currentUser: null,
            activeTab: "3"
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const url = window.location.href;
        const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
        let currentUser = storageService.getItems('currentUser');

        // Events
        window.addEventListener('reloadTaskEvent', this.addTask);
        window.addEventListener('newMaterialEvent', this.addMaterial);
        window.addEventListener('newReportEvent', this.addReport);

        this.getCommissionsData(id);
        this.setState({currentUser: currentUser});
    };

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('reloadTaskEvent', this.addTask, false);
            window.removeEventListener('newMaterialEvent', this.addMaterial, false);
            window.removeEventListener('newReportEvent', this.addReport, false);
        }
        this._isMounted = false;
    }

    toggleTab = tab => e => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    addTask = (task) => {
        this.setState({newTask: task});
    };

    addMaterial = (item) => {
      this.setState({newMaterial: item});
    };

    addReport = (report) => {
        this.setState({newReport: report});
    };

    getCommissionsData = (id) => {
        const commissions = storageService.getItems('localOpenedCommissions');
        if (commissions) {
            commissions.forEach((item) => {
                if (item.id === id) {
                    if (this._isMounted) {
                        this.setState({
                            commissionId: id,
                            commissionName: item.name,
                        })
                    }
                }
            });
        }
    };

    renderMaterialList = () => {
        return <MaterialList
            newMaterial={this.state.newMaterial}
            resetNewMaterial={() => this.setState({newMaterial: null})}
        />
    };

    renderReportsList = () => {
        return <ReportsTable
            newReport={this.state.newReport}
            resetNewReport={() => this.setState({newReport: null})}
        />
    };

    renderTaskList = () => {
        return <TasksList
            newTask={this.state.newTask}
            resetNewTask={() => this.setState({newTask: null})}
        />
    };

    renderNotSentTaskList = () => {
        const { commissionId } = this.state;
        const notSentTasks = JSON.parse(localStorage.getItem('notSentTasks'));
        if (notSentTasks) {
            if (notSentTasks[commissionId]) {
                if (notSentTasks[commissionId].length) {
                    return (
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBContainer>
                                    <h3 className="py-4">Not sent tasks</h3>
                                    <NotSentTask
                                        name='tasks'
                                        items={notSentTasks[commissionId]}
                                    />
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    );
                }
            }
        }

        return <div></div>;
    };

    render() {
        const { commissionName, currentUser } = this.state;
        let addTaskSection, costsSummarySection;

        if (currentUser && currentUser.role === 'ROLE_ADMIN') {
             addTaskSection = <MDBRow>
                                    <MDBCol md="12">
                                        <AddTask updateTaskList={(task) => this.addTask(task)}/>
                                    </MDBCol>
                                </MDBRow>;

            costsSummarySection =
                <MDBNavItem>
                    <MDBNavLink to="#" active={this.state.activeTab === "4"} onClick={this.toggleTab("4")} role="tab" >
                        Costs summary
                    </MDBNavLink>
                </MDBNavItem>;
        }



        return (
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
                            Reports
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeTab === "3"} onClick={this.toggleTab("3")} role="tab" >
                            Tasks
                        </MDBNavLink>
                    </MDBNavItem>

                    { costsSummarySection }

                </MDBNav>

                <MDBTabContent activeItem={this.state.activeTab} >

                    <MDBTabPane tabId="1" role="tabpanel">
                        <MDBRow>
                            <MDBCol md="4">
                                <AddMaterial updateMaterialList={(material) => this.addMaterial(material)}/>
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
                                <AddDayReport updateReportList={(report) => this.addReport(report)}/>
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
                        { addTaskSection }
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBContainer>
                                    <h3 className="pb-5">Tasks</h3>
                                    {this.renderTaskList()}
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>

                        {this.renderNotSentTaskList()}

                    </MDBTabPane>

                    <MDBTabPane tabId="4" role="tabpanel">
                        <CostsSummary />
                    </MDBTabPane>

                </MDBTabContent>
            </MDBContainer>
        );
    }
}

export { CommissionPage };
