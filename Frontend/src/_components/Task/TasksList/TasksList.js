import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader
} from 'mdbreact';

const TasksList = (props) => {

    const toggleVisibilityContent = () => {
      /*  <input id={`finished${key}`} name={ props.items[props.date][key].status } onChange={handleChange} className="custom-control-input" type="checkbox"/>
        { console.log(props.items[props.date][key]) }
        <label className="custom-control-label" htmlFor={`finished${key}`}></label> */
    };

    let wrapper = React.createRef();

    const handleChange = (e) => {
        console.log(e.target);
        console.log(e.target.value);
        console.log(e.target.name);
    };

    return(
        <div className="d-flex justify-content-around" ref={wrapper}>
            { Object.keys(props.items[props.date]).map((key) => {
                return <React.Fragment key={key}>
                    <MDBCard style={{ width: "22rem" }} id={props.id}>
                        <MDBCardHeader className="d-flex justify-content-between">
                            <p className="small">Created at: { props.date }</p>
                            <p className="small">Status: <b>{props.items[props.date][key].status}</b></p>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBCardTitle>{props.items[props.date][key].employeeAssigned}</MDBCardTitle>
                            <MDBCardText>{props.items[props.date][key].description}</MDBCardText>
                        </MDBCardBody>
                        <div className="custom-control custom-checkbox">
                            <button className="btn btn-black">Close task</button>
                        </div>
                    </MDBCard>

                </React.Fragment>
            })}
        </div>
    );
};

export { TasksList };
