import React, { Component } from 'react';
import { Card } from '../_components/Card';
import { AddCommission } from "../_components/AddCommission";
import { commissionService } from "../_services/commissionService";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openedCommissions: null
        }
    }

    componentWillMount() {
        this.getOpenedCommissions();
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

    loadCommissionsFromServer = () => {
        const commissionsPromise = commissionService.getAll();

        commissionsPromise.then(response => {
            console.log(response);
            if (response.status === 200) {
                return response
            }
        }).then(response => response.json()
                .then((response => {
                    if (response) {

                    }
                    console.log(response);
                    console.log(response.commissions);
                    this.setState({
                        openedCommissions: response.commissions
                    })
                })))
            .catch(error => {
                this.setState({
                    openedCommissions: JSON.parse(localStorage.getItem('localOpenedCommissions'))
                });
            });

        return false;
    };

    updateList = () => {
        this.getOpenedCommissions();
        this.renderList();
    };

    renderList = () => {
        const { openedCommissions } = this.state;

        if (openedCommissions) {
            return Object.keys(openedCommissions).map((key) =>
                <Card
                    key={key}
                    id={key}
                    title={openedCommissions[key].name}
                    address = { `${openedCommissions[key].street} ${openedCommissions[key].houseNumber} ${openedCommissions[key].town}` }
                    createdAt = {openedCommissions[key].createdAt} />
            );
        }
    };

   render() {
       const { openedCommissions } = this.state;

       if (openedCommissions) {
           return (
               <div>
                   <h2 className="h2 py-5">Opened Commissions</h2>
                   <AddCommission updateList={this.updateList}/>
                   <div className="d-flex justify-content-around my-5">
                       {this.renderList()}
                   </div>
               </div>
           );
       }

       return (
           <div className="spinner-border" role="status">
               <span className="sr-only">Loading...</span>
           </div>
       );
   }
}

export { HomePage };
