import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import {commissionService} from "../../../_services/index";
import Spinner from "../../../_components/Spinner/Spinner";

class CostsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalHoursSummary: 0,
            employees: null,
            total: 0
        }
    }

    componentDidMount() {
        const url = window.location.href;
        const id = parseInt(url.substring(url.lastIndexOf('/') + 1));
        commissionService.getWorkingHoursSummary(id)
            .then(response => response.json())
            .then((response => {
                this.setState({
                    employees: response.generalSummary,
                    totalCost: response.totalCost,
                    totalHoursSummary: response.totalHoursSummary
                });
            }));
    }

    render() {
        const { employees, totalCost, totalHoursSummary } = this.state;

        if (!employees) {
            return <Spinner />
        }

        return (
            <MDBRow>
                <MDBCol md="12">
                    <MDBContainer>
                        <h3 className="py-4">Costs summary</h3>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Hours Summary</th>
                                        <th>Salary</th>
                                        <th>Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employees.map((employee, key) => {
                                            return <tr key={key}>
                                                <td>{employee.firstName}</td>
                                                <td>{employee.lastName}</td>
                                                <td>{employee.summary}</td>
                                                <td>{employee.salary}</td>
                                                <td><b>{ employee.summary * employee.salary }</b> USD</td>
                                            </tr>
                                        })
                                    }
                                    <tr>
                                        <td colSpan="5">Cost in total: <b>{totalCost}</b> USD</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">Working Hours in total: <b>{totalHoursSummary}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        );
    }
}

export { CostsSummary };
