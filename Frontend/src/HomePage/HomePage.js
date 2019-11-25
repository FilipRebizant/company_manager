import React, { Component } from 'react';
import { Card } from '../_components/Card';
import { AddCommission } from "../_components/AddCommission";
import { commissionService } from "../_services/commissionService";
import {storageService} from "../_services";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openedCommissions: null,
            notSentCommissions: null
        }
    }

    componentDidMount() {
        this.getOpenedCommissions();
        // this.getCommissionsFromStorage();
    };

    getOpenedCommissions = () => {
        let openedCommissions = this.loadCommissionsFromServer();

        // if (openedCommissions === false) {
        //     openedCommissions = localStorage.getItem('localOpenedCommissions');
        // }
        //
        // this.setState({
        //     openedCommissions: JSON.parse(openedCommissions)
        // });
    };

    componentDidUpdate() {
        this.renderList();
        this.renderNotSentCommissions();
    }

    loadCommissionsFromServer = () => {
        const commissionsPromise = commissionService.getAll();

        commissionsPromise.then(response => {
            if (response.status === 200) {
                return response
            }
        }).then(response => response.json()
            .then((response => {
                if (!response.errors) {

                    console.log(response);
                    console.log(response.commissions);
                    this.setState({
                        openedCommissions: response.commissions
                    })
                } else {
                    this.getCommissionsFromStorage();
                }
            })))
            .catch(error => {
                this.getCommissionsFromStorage()
            });

        return false;
    };

    getCommissionsFromStorage = () => {
        this.setState({
            openedCommissions: storageService.getItems('localOpenedCommissions'),
            notSentCommissions: storageService.getItems('notSentCommissions')
        });
    };

    addItem = (item) => {
        let { openedCommissions, notSentCommissions } = this.state;
        console.log(item);
        if (!openedCommissions) {
            const local =  JSON.parse(localStorage.getItem('localOpenedCommissions'));
            if (local) {
                openedCommissions = local;
            } else {
                openedCommissions = [];
            }
        }
        openedCommissions.push(item);
        console.log(openedCommissions);

        this.setState({openedCommissions: openedCommissions});
    };

    updateList = () => {
        this.getOpenedCommissions();
        this.getCommissionsFromStorage();
        this.renderList();
        this.renderNotSentCommissions();
    };

    renderList = () => {
        const { openedCommissions } = this.state;

        if (openedCommissions) {
            return Object.keys(openedCommissions).map((key) =>
                <Card
                    key={key}
                    id={openedCommissions[key].id}
                    title={openedCommissions[key].name}
                    address = { `${openedCommissions[key].street} ${openedCommissions[key].houseNumber} ${openedCommissions[key].town}` }
                    createdAt = {openedCommissions[key].createdAt} />
            );
        }

        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    };

    renderNotSentCommissions = () => {
        const { notSentCommissions } = this.state;

        if (notSentCommissions) {
            return Object.keys(notSentCommissions).map((key) =>
                <Card
                    key={key}
                    id={notSentCommissions[key].id}
                    title={notSentCommissions[key].name}
                    address = { `${notSentCommissions[key].street} ${notSentCommissions[key].houseNumber} ${notSentCommissions[key].town}` }
                    createdAt = {notSentCommissions[key].createdAt} />
            );
        }
    }

    renderNotSentCommissionsWrapper = () => {
        return (
            <div>
                <h2 className="h2 py-5">Not sent commissions</h2>
                <div className="d-flex justify-content-around my-5">
                    {this.renderNotSentCommissions()}
                </div>
            </div>
        );
    }

   render() {
       return (
           <div>
               <h2 className="h2 py-5">Opened Commissions</h2>
               <AddCommission updateList={this.updateList} addItem={(item) => this.addItem(item)}/>
               <div className="d-flex justify-content-around my-5">
                   {this.renderList()}
               </div>
               {this.renderNotSentCommissionsWrapper()}
           </div>
       );
   }
}

export { HomePage };
