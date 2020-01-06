import React, { Component } from 'react';
import { MDBHamburgerToggler, MDBTable, MDBTableHead } from 'mdbreact';
import {materialService} from "../../../_services";

class MaterialList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            material: [],
            commissionId: null,
            newMaterial: this.props.newMaterial,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const url = window.location.href;
        const id = parseInt(url.substring(url.lastIndexOf('/') + 1));

        this.setState({
            commissionId: id
        });
        this.loadMaterial(id);
    }

    loadMaterial = (id) => {
        // const { commissionId } = this.state;
        materialService.getMaterials(id)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({
                    material: response.materials
                });
            })
    };

    // const style = {
    //     border: '1px solid #ced4da',
    //     margin: '15px 0',
    // };
    //
    // const columns= [
    //     {
    //         label: '#',
    //         field: 'id',
    //         sort: 'asc'
    //     },
    //     {
    //         label: 'Name',
    //         field: 'name',
    //         sort: 'asc'
    //     },
    //     {
    //         label: 'Code',
    //         field: 'last',
    //         sort: 'asc'
    //     },
    //     {
    //         label: 'Quantity',
    //         field: 'handle',
    //         sort: 'asc'
    //     }
    // ];

    toggleVisibilityContent = () => {
        let wrapper = React.createRef();
        let hiddenPart = wrapper.current.children[1];
        if (hiddenPart.classList.contains("hiddenContent")) {
            hiddenPart.classList.remove("hiddenContent");
        } else {
            hiddenPart.classList.add("hiddenContent");
        }
    };

// <div ref={wrapper} style={style}>
// <div className="card-header d-flex justify-content-between">
// <div>{props.date}</div>
// <MDBHamburgerToggler color="#000000" id={`${props.name}-${props.date}`}
// onClick={toggleVisibilityContent}/>
// </div>
// <div className="hiddenContentContainer hiddenContent">
// <MDBTable responsive>
// <MDBTableHead columns={columns}/>
// <tbody>
// {Object.keys(props.items[props.date]).map((key) => {
//     return <React.Fragment key={key}>
//         <tr>
//             <td>{parseInt(key) + 1}</td>
//             <td>{props.items[props.date][key].name}</td>
//             <td>{props.items[props.date][key].code}</td>
//             <td>{props.items[props.date][key].quantity}</td>
//         </tr>
//     </React.Fragment>
// })
// }
// </tbody>
// </MDBTable>
// </div>
// </div>
    render() {
        const { material } = this.state;

        return (
            <React.Fragment>
                {Object.keys(material).map((date, k) => {
                    return <div key={k}>
                            <div>{console.log(date)}</div>
                        </div>
                })}
            </React.Fragment>
        );
    };
}

export { MaterialList };
