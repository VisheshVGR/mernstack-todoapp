import { ListGroup } from 'react-bootstrap';

const TodoList = (props) => {
    return (
        <>
            <ListGroup className="mainList overflow-auto">
                {props.items}
            </ListGroup>
        </>
    )
}

export default TodoList