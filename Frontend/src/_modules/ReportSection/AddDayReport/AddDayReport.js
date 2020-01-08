import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { Label } from "../../../_components/atoms/Label/index";
import { Input } from "../../../_components/atoms/Input/index";
import { getCommissionId, getCurrentDate, countTimeDifference } from "../../../_helpers/index";
import { reportService, storageService } from "../../../_services/index";
import Spinner from "../../../_components/Spinner/Spinner";

class AddDayReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createdAt: '',
            startedAt: '',
            finishedAt: '',
            dayDescription: '',
            currentUser: null,
            isShowingAlert: false,
            alert: null,
            alertStatus: '',
            isShowingLoader: false
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

    validate = () => {
        const { dayDescription, finishedAt, startedAt } = this.state;

        if (startedAt === "" || startedAt === undefined) {
            this.setState({
                isShowingAlert: true,
                alert: 'Started at can not be empty',
                alertStatus: 'danger'
            });

            return false;
        }

        if (finishedAt === "" || finishedAt === undefined) {
            this.setState({
                isShowingAlert: true,
                alert: 'Finished at can not be empty',
                alertStatus: 'danger'
            });

            return false;
        }

        if (dayDescription === "") {
            this.setState({
                isShowingAlert: true,
                alert: 'Day description can not be empty',
                alertStatus: 'danger'
            });

            return false;
        }


        return true;
    };

    prepareNewReport = () => {
        const {startedAt, finishedAt, dayDescription} = this.state;
        const summary = countTimeDifference(startedAt, finishedAt);
        let { createdAt } = this.state;

        if (createdAt === '') {
            createdAt = getCurrentDate();
        }

        const currentUser = storageService.getItems('currentUser').name;

        return {
            commissionId: getCommissionId(),
            hoursSum: summary,
            finishedAt: finishedAt,
            startedAt: startedAt,
            dayDescription: dayDescription,
            addedBy: currentUser,
            createdAt: createdAt
        };
    };

    addNewReport = (newReport) => {
        reportService.pushReport(newReport)
            .then(response => response.json())
            .then((response => {
                if (response.id) {
                    newReport.id = response.id;
                    this.setState({
                        isShowingAlert: true,
                        alert: 'Report sent successfully',
                        alertStatus: 'success',
                        isShowingLoader: false
                    });

                    this.resetInputFields();
                    const event = new CustomEvent('newReportEvent', newReport);
                    window.dispatchEvent(event);
                } else {
                    this.addToNotSent(newReport);
                    this.setState({
                        alert: 'Couldn\'t connect to server, report has been saved locally',
                        alertStatus: 'danger',
                        isShowingAlert: true,
                        isShowingLoader: false
                    });
                }
            }))
            .catch((e) => {
                this.addToNotSent(newReport);
                this.setState({
                    alert: 'Couldn\'t connect to server, report has been saved locally',
                    alertStatus: 'danger',
                    isShowingAlert: true,
                    isShowingLoader: false
                });
            });
    };

    addToNotSent = (newReport) => {
        let currentNotSentReports = JSON.parse(localStorage.getItem('notSentReports'));

        if (!currentNotSentReports) {
            currentNotSentReports = {};
        }
        if (!currentNotSentReports[newReport.commissionId]) {
            currentNotSentReports[newReport.commissionId] = [];
        }
        currentNotSentReports[newReport.commissionId].push(newReport);
        localStorage.setItem('notSentReports', JSON.stringify(currentNotSentReports));
        this.props.updateReportList(newReport);
    };

    handleFormSubmit = (e) => {
        e.preventDefault();

        if (this.validate()) {
            const newReport = this.prepareNewReport();

            this.addNewReport(newReport);
            this.resetInputFields();
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

        return(
            <form onSubmit={this.handleFormSubmit}>
                <h3 className="text-center py-4">Add Day Report</h3>
                { alertContainer }
                { spinnerContainer }
                <div className="form-group">
                    <Label for="startedAt"/>
                    <Input type="time" id="currentTime" name="startedAt" value={this.state.startedAt} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <Label for="addReportFinished"/>
                    <Input type="time" id="addReportFinished" name="finishedAt" value={this.state.finishedAt} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <Label for="addReportCreated"/>
                    <Input type="date" id="addReportCreated" name="createdAt" value={this.state.createdAt} onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <Label for="dayDescription"/>
                    <textarea
                        className="form-control"
                        name="dayDescription"
                        rows="3"
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
