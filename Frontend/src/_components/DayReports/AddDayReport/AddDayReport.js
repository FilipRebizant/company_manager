import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { Label } from "../../atoms/Label/index";
import { Input } from "../../atoms/Input/index";

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

    componentDidMount() {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);

        this.setState({commissionId: id});
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

    countDifference = (startedAt, finishedAt) => {
        const startedDate = new Date();
        const finishedDate = new Date();
        const startedHours = startedAt.split(":")[0];
        const startedMinutes = startedAt.split(":")[1];
        const finishedHours = finishedAt.split(":")[0];
        const finishedMinutes = finishedAt.split(":")[1];

        startedDate.setHours(startedHours);
        startedDate.setMinutes(startedMinutes);
        finishedDate.setHours(finishedHours);
        finishedDate.setMinutes(finishedMinutes);

        return Math.abs(finishedDate.getTime() - startedDate.getTime()) / 3600000;
    };

    handleFormSubmit = (e) => {
        e.preventDefault();

        const {commissionId, date, startedAt, finishedAt, dayDescription, addedBy} = this.state;
        const summary = this.countDifference(startedAt, finishedAt);

        const newItem = {
            commissionId: parseInt(commissionId),
            date: date,
            startedAt: startedAt,
            finishedAt: finishedAt,
            hoursSum: summary,
            dayDescription: dayDescription,
            addedBy: addedBy,
            pushed: false
        };
        let currentMaterialList = localStorage.getItem('localDayReports');

        if (currentMaterialList === null) {
            currentMaterialList = {};
        } else {
            currentMaterialList = JSON.parse(currentMaterialList);
        }

        if (!currentMaterialList[newItem.date]) {
            currentMaterialList[newItem.date] = [];
        }

        if (this.state.usedAt !== '') {
            currentMaterialList[newItem.date].push(newItem);
            localStorage.setItem("localDayReports", JSON.stringify(currentMaterialList));

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
