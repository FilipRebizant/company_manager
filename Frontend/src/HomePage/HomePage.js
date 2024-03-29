import React, { Component } from 'react';
import { Commission } from '../_modules/CommissionSection/Commission';
import { AddCommission } from "../_modules/CommissionSection/AddCommission";
import { commissionService, storageService } from "../_services";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openedCommissions: [],
            notSentCommissions: []
        }
    }

    componentDidMount() {
        this.loadCommissionsFromServer();
    };

    loadCommissionsFromServer = () => {
        const commissionsPromise = commissionService.getAll();

        commissionsPromise.then(response => {
            if (response.status === 200) {
                return response
            }
        }).then(response => response.json()
            .then((response => {
                if (!response.errors) {
                    this.setState({
                        openedCommissions: response.commissions
                    });
                    storageService.setItem(response.commissions, 'localOpenedCommissions');
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
        let { openedCommissions } = this.state;
        if (!openedCommissions) {
            const local =  JSON.parse(localStorage.getItem('localOpenedCommissions'));
            if (local) {
                openedCommissions = local;
            } else {
                openedCommissions = [];
            }
        }
        openedCommissions.push(item);

        this.setState({openedCommissions: openedCommissions});
    };

    updateList = () => {
        // this.getOpenedCommissions();
        // this.getCommissionsFromStorage();
        // this.renderList();
        // this.renderNotSentCommissions();
    };

    renderList = () => {
        const { openedCommissions } = this.state;

        if (openedCommissions) {
            return Object.keys(openedCommissions).map((key) =>
                <Commission
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
                <Commission
                    key={key}
                    id={notSentCommissions[key].id}
                    title={notSentCommissions[key].name}
                    address = { `${notSentCommissions[key].street} ${notSentCommissions[key].houseNumber} ${notSentCommissions[key].town}` }
                    createdAt = {notSentCommissions[key].createdAt} />
            );
        }
    };

    renderNotSentCommissionsWrapper = () => {
        return (
            <div>
                <h2 className="h2 py-5"></h2>
                <div className="d-flex justify-content-around my-5">
                    {this.renderNotSentCommissions()}
                </div>
            </div>
        );
    };

   render() {
       return (
           <div>
               <h2 className="h2 py-5">Commissions</h2>
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
