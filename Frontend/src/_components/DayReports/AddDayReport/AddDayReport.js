import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { Label } from "../../atoms/Label/index";
import { Input } from "../../atoms/Input/index";
import { getCommissionId, getCurrentDate, countTimeDifference } from "../../../_helpers";
import {reportService, storageService} from "../../../_services";

class AddDayReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commissionId: '',
            createdAt: '',
            startedAt: '',
            finishedAt: '',
            addedBy: "John Doe",
            dayDescription: ''
        }
    }

    resetInputFields = () => {
        this.setState({
            createdAt: '',
            startedAt: '',
            finishedAt: '',
            dayDescription: ''
        })
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    validate = (report) => {
        return true;
    };

    prepareNewReport = () => {
        const {startedAt, finishedAt, dayDescription, addedBy} = this.state;
        const summary = countTimeDifference(startedAt, finishedAt);
        let { createdAt } = this.state;

        if (createdAt === '') {
            createdAt = getCurrentDate();
        }

        return {
            commissionId: getCommissionId(),
            createdAt: createdAt,
            startedAt: startedAt,
            finishedAt: finishedAt,
            hoursSum: summary,
            dayDescription: dayDescription,
            addedBy: addedBy,
            pushed: false
        };
    };

    addNewReport = (newReport) => {
        reportService.pushReport(newReport)
            .then((response => {
                if (response.ok) {
                    newReport.id = response.id;
                } else {
                    this.saveLocally(newReport);
                }
            }))
            .catch((e) => {
                this.saveLocally(newReport);
            });

        let commissions =  JSON.parse(localStorage.getItem('localOpenedCommissions'));

        for (let elem in commissions) {
            if (commissions[elem].id === newReport.commissionId) {
                if (!commissions[elem].reports[newReport.createdAt]) {
                    commissions[elem].reports[newReport.createdAt] = [];
                }

                commissions[elem].reports[newReport.createdAt].push(newReport);
                localStorage.removeItem('localOpenedCommissions');
                localStorage.setItem('localOpenedCommissions', JSON.stringify(commissions));
            }
        }
    };

    saveLocally = (newReport) => {
        storageService.addItem(newReport, 'notSentReports');
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const newReport = this.prepareNewReport();

        if (this.validate(newReport)) {
            this.addNewReport(newReport);
            // this.resetInputFields();
            this.props.updateList();
        }
    };

    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h3 className="text-center py-4">Add Day Report</h3>

                <div className="form-group">
                    <Label for="startedAt"/>
                    <Input type="time" id="currentTime" name="startedAt" value={this.state.startedAt} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <Label for="finishedAt"/>
                    <Input type="time" name="finishedAt" value={this.state.finishedAt} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <Label for="createdAt"/>
                    <Input type="date" name="createdAt" value={this.state.createdAt} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <Label for="dayDescription"/>
                    <textarea
                        className="form-control"
                        name="dayDescription"
                        rows="5"
                        value={this.state.dayDescription}
                        onChange={this.handleChange} ></textarea>
                </div>

                <Input type="hidden" value={this.state.commissionId} />
                <Input type="hidden" name="addedBy" value="John Doe" />

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

export { AddDayReport }
