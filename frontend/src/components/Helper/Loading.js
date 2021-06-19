import React from "react"
import { Spinner } from 'react-bootstrap'

const Loading = (props) => {
    return (
        <>
            <div style={props.disp} className="disp"><div className="disp-box"><Spinner animation="border" variant="primary" />  LOADING...</div></div>
        </>
    )
}

export default Loading