import React, {Component} from 'react';

import { Card } from '../_components/Card';

class HomePage extends Component {
    // constructor(props) {
    //     super(props);
    // }

   render() {
       return(
           <div>
               <h2>Home</h2>

               <Card id={1}
                     title={'Title'}
                     address = {'Rejtana 5, Rzeszów'}
                     createdAt = {'28.08.2019'}/>
           </div>
       );
   }
}

export { HomePage };