import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { Label } from "../../atoms/Label/index";
import { Input } from "../../atoms/Input/index";
import { getCommissionId, getCurrentDate, countTimeDifference } from "../../../_helpers";

class AddDayReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commissionId: '',
            date: '',
            startedAt: '',
            finishedAt: '',
            addedBy: "John Doe",
            dayDescription: ''
        }
    }

    resetInputFields = () => {
        this.setState({
            date: '',
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

    getNewReport = () => {
        const {startedAt, finishedAt, dayDescription, addedBy} = this.state;
        const summary = countTimeDifference(startedAt, finishedAt);
        let { date } = this.state;

        if (date === '') {
            date = getCurrentDate();
        }

        return {
            commissionId: getCommissionId(),
            date: date,
            startedAt: startedAt,
            finishedAt: finishedAt,
            hoursSum: summary,
            dayDescription: dayDescription,
            addedBy: addedBy,
            pushed: false
        };
    };

    addNewReport = (newReport) => {
        let commissions =  JSON.parse(localStorage.getItem('localOpenedCommissions'));

        for (let elem in commissions) {
            if (commissions[elem].id === newReport.commissionId) {
                if (!commissions[elem].reports[newReport.date]) {
                    commissions[elem].reports[newReport.date] = [];
                }

                commissions[elem].reports[newReport.date].push(newReport);
                localStorage.removeItem('localOpenedCommissions');
                localStorage.setItem('localOpenedCommissions', JSON.stringify(commissions));
            }
        }

    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const newReport = this.getNewReport();

        if (this.validate(newReport)) {
            this.addNewReport(newReport);
            this.props.updateList();
            this.resetInputFields();
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
                    <Label for="date"/>
                    <Input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
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
