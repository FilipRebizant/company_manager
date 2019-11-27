import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { MaterialList } from "../_components/Material/MaterialList";
import { AddMaterial } from "../_components/Material/AddMaterial";
import { AddDayReport } from "../_components/DayReports/AddDayReport";
import { ReportsTable } from "../_components/DayReports/ReportsTable";
import { AddTask } from "../_components/Task/AddTask";
import { TasksList } from "../_components/Task/TasksList";
import { NotSentTask } from "../_components/Task/NotSentTask";
import {storageService, taskService} from "../_services";

class CommissionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material: null,
            reports: null,
            tasks: null,
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
        this.getCommissionsData(this.state.commissionId);
        this.renderNotSentTaskList();
        this.renderTaskList();
    };

    refreshTaskLists = (task) => {
        let array = this.state.tasks;

        if (!array) {
            array = [];
        }

        if (!array[task.createdAt]) {
            array[task.createdAt] = [];
        }

        array[task.createdAt].push(task);
        this.setState({
            tasks: array
        });
        this.renderNotSentTaskList();
        this.renderTaskList();
    };

    getCommissionsData = (id) => {
        const commissions = storageService.getItems('localOpenedCommissions');
        if (commissions) {
            commissions.map((item) => {
                if (item.id === id) {
                    this.setState({
                        commissionId: id,
                        commissionName: item.name,
                        material: item.material,
                        reports: item.reports,
                        tasks: item.tasks
                    })
                }
            });
        }
    };

    componentDidMount() {
       const url = window.location.href;
       const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
       this.getCommissionsData(id);

       // this.loadTasks(id);
    };

    loadTasks = (id) => {
        taskService.getTasks(id);
    };

    renderMaterialList = () => {
        const { material } = this.state;
        if (material) {
            return Object.keys(material).map((key) => {
                return <MaterialList
                    key={key}
                    name='material'
                    date={key}
                    items={material}
                />
            });
        }

        return <div></div>;
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

        return <div></div>;
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

        return <div></div>;
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
        const { commissionName } = this.state;

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
                                <AddTask updateTaskList={this.refreshTaskLists}/>
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

                        {this.renderNotSentTaskList()}

                    </MDBTabPane>

                </MDBTabContent>
            </MDBContainer>
        );
    }
}

export { CommissionPage };
