import React from "react"
import { ListGroup, Button } from 'react-bootstrap';

const ListGroupItem = (props) => {
    const disp = (props.data.checked) ? {background : "rgb(48, 255, 104)"} : null
    return (
        <>
            <ListGroup.Item className="d-flex justify-content-between align-items-center" style={disp}>
                <Button variant="outline-primary" className="mr-3" onClick={()=>props.handleCheckbox(props.data._id)}>
                    {props.data.checked ? <i className="far fa-check-circle" /> : <i className="far fa-circle" />}
                </Button>

                {props.data.description}

                <Button variant="outline-danger" className="ml-3" onClick={()=>props.handleDelete(props.data._id)}>
                    <i className="far fa-trash-alt" />
                </Button>
            </ListGroup.Item>
        </>
    )
}

export default ListGroupItem