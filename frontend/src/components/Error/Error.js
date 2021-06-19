import React from "react"
import {Link} from "react-router-dom"

const Error = () => {
    return (
        <>
        <h1 className="text-white pt-3 text-center"><Link to="/" className="homelink"><i className="fas fa-calendar-check"></i> Todo App</Link></h1>
        <h1 className="text-center">404 Error! Page not found...</h1>
        </>
    )
}

export default Error