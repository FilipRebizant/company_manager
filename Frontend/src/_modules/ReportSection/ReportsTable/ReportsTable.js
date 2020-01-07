import React, { Component } from 'react';
import { MDBHamburgerToggler, MDBTable, MDBTableHead } from 'mdbreact';
import { reportService, storageService } from "../../../_services";

class ReportsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: {
                dates: []
            },
            commissionId: null,
            newReport: this.props.newReport,
        };
    }

    componentDidMount() {
        const url = window.location.href;
        const id = parseInt(url.substring(url.lastIndexOf('/') + 1));

        this.setState({
            commissionId: id
        });
        this.loadReports(id);
    }

    shouldComponentUpdate(instance, nextProps, nextState) {
        if (instance.newReport !== null) {
            this.loadReports(this.state.commissionId);
            this.props.resetNewReport();
        }

        return true;
    }

    loadReports = (id) => {
        reportService.getReports(id)
            .then(response => response.json())
            .then(response => {
                if (response.reports) {
                    let currState = Object.assign({}, this.state);
                    currState.reports.dates = response.reports;

                    this.setState(currState);
                    this.saveReportsLocally();
                } else {
                    this.getReportsFromStorage();
                }
            }).catch(() => {
            this.getReportsFromStorage();
        })
    };

    getReportsFromStorage = () => {
        const storageReports = storageService.getItems('localReports');
        const { commissionId } = this.state;

        if (storageReports[commissionId]) {
            let currState = Object.assign({}, this.state);
            currState.reports.dates = storageReports[commissionId];

            this.setState(currState);
        }
    };

    saveReportsLocally = () => {
        const { reports, commissionId } = this.state;
        let storageReports = storageService.getItems('localReports');

        storageReports[commissionId] = reports;
        storageService.setItem(storageReports, 'localReports');
    };

    getColumnNames = () => {
        return [
            {
                label: '#',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Added By',
                field: 'addedBy',
                sort: 'asc'
            },
            {
                label: 'Started At',
                field: 'startedAt',
                sort: 'asc'
            },
            {
                label: 'Finished At',
                field: 'last',
                sort: 'asc'
            },
            {
                label: 'Summary',
                field: 'handle',
                sort: 'asc'
            }
        ];
    };

    toggleVisibilityContent = (wrapper) => {
        let hiddenPart = wrapper.current.children[1];
        if (hiddenPart.classList.contains("hiddenContent")) {
            hiddenPart.classList.remove("hiddenContent");
        } else {
            hiddenPart.classList.add("hiddenContent");
        }
    };

    render() {
        const { reports } = this.state;

        return (
            Object.values(reports.dates).map((item, k) => {
                let wrapper = React.createRef();

                return (
                    <div ref={wrapper} className="list-group-wrapper" key={k}>
                        <div className="card-header d-flex justify-content-between">
                            <div>{item[0].createdAt}</div>
                            <MDBHamburgerToggler color="#000000" id={`report-${item[0].createdAt}`} onClick={() => this.toggleVisibilityContent(wrapper)}/>
                        </div>
                        <div className="hiddenContentContainer hiddenContent">
                            <MDBTable responsive>
                                <MDBTableHead columns={this.getColumnNames()}/>
                                <tbody>
                                {
                                    Object.values(item).map((i, key) => {
                                        return (
                                            <React.Fragment key={key}>
                                                <tr>
                                                    <td className="table__data_counter" rowSpan="2">{(key)+1}</td>
                                                    <td>{i.createdAt}</td>
                                                    <td>{i.startedAt}</td>
                                                    <td>{i.finishedAt}</td>
                                                    <td>{i.hoursSummary} hours</td>
                                                </tr>
                                                <tr className="table__row-full-width">
                                                    <td className="table__data-highlighted"
                                                        colSpan="4">{i.dayDescription}</td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    })
                                }
                                </tbody>
                            </MDBTable>
                        </div>
                    </div>
                );
            })
        );
    }
}

export { ReportsTable };
