import React, {Component} from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { Label } from "../atoms/Label";
import { Input } from "../atoms/Input";

class AddDayReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commissionId: '',
            date: '',
            startedAt: '',
            finishedAt: '',
            hoursSum: '',
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
            hoursSum: '',
            dayDescription: ''
        })
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        console.log(this.state);

        const {commissionId, date, startedAt, finishedAt, hoursSum, dayDescription} = this.state;
        const newItem = {
            commissionId: parseInt(commissionId),
            date: date,
            startedAt: startedAt,
            finishedAt: finishedAt,
            hoursSum: hoursSum,
            dayDescription: dayDescription,
            pushed: false
        };
        let currentMaterialList = localStorage.getItem('localReportDays');

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
            localStorage.setItem("localReportDays", JSON.stringify(currentMaterialList));

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
                    <Input type="time" name="startedAt" value={this.state.startedAt} onChange={this.handleChange} />
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
