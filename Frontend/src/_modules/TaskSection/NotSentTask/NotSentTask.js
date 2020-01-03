import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader
} from 'mdbreact';
import {Task} from "../Task";

const NotSentTask = (props) => {
    return(
        <div className="d-flex justify-content-around">
            { Object.keys(props.items).map((set, index) => {
                return <ul key={index} className="col-md-4">
                    {props.items.map((task, i) => {
                        return  <Task
                            key={i}
                            id={task.id}
                            createdAt={task.createdAt}
                            status={task.status}
                            priority={task.priority}
                            employeeAssigned={task.employeeAssigned}
                            description={task.description}
                            handleTaskUpdate={(i, status, newStatus) => this.handleTaskUpdate(i, status, newStatus)}
                            index={i}
                        />
                    })}
                </ul>
            })}
        </div>
    );
};

export { NotSentTask };
