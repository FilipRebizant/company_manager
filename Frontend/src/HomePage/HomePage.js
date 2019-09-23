import React, { Component } from 'react';
import { Card } from '../_components/Card';
import { AddCommission } from "../_components/AddCommission";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            localOpenedCommissions: null
        }
    }

    componentWillMount() {
        this.getOpenedCommissions();
    };

    getOpenedCommissions = () => {
        const localOpenedCommissions = localStorage.getItem('localOpenedCommissions');

        this.setState({
            localOpenedCommissions: JSON.parse(localOpenedCommissions)
        });
    };

    updateList = () => {
        this.getOpenedCommissions();
        this.renderList();
    };

    renderList = () => {
        const { localOpenedCommissions } = this.state;

        if (localOpenedCommissions) {
            return Object.keys(localOpenedCommissions).map((key) =>
                <Card
                    key={key}
                    id={key}
                    title={localOpenedCommissions[key].name}
                    address = { `${localOpenedCommissions[key].street} ${localOpenedCommissions[key].houseNumber} ${localOpenedCommissions[key].town}` }
                    createdAt = {localOpenedCommissions[key].createdAt} />
            );
        }
    };

   render() {
       return(
           <div>
               <h2 className="h2 py-5">Opened Commissions</h2>
               <AddCommission updateList={this.updateList}/>
               <div className="d-flex justify-content-around my-5">
                    {this.renderList()}
               </div>
           </div>
       );
   }
}

export { HomePage };
