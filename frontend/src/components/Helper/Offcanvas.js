import React from "react"
import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

const Offcanvas = (props) => {

  return (
    <>
      <button className="btn btn-dark side_menu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">M<br />E<br />N<br />U</button>
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel"><i className="fas fa-ghost"></i>  Welcome {props.name || "user"}!</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">

          <ListGroup variant="flush">
            <ListGroup.Item>
              <Link to="/"><i className="fas fa-home"></i>  Home</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/todo"><i className="fas fa-calendar-check"></i>  Todo</Link>
            </ListGroup.Item>
            {props.name && <ListGroup.Item>
              <Link to="/profile"><i className="fas fa-user-circle"></i>  Profile</Link>
            </ListGroup.Item>}
            <ListGroup.Item>
              <Link to="/aboutus"><i className="fas fa-info-circle"></i>  About</Link></ListGroup.Item>
            <ListGroup.Item>
              <Link to="/contactus"><i className="fas fa-envelope"></i>  Contact Us</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              {props.name ? <Link to="/logout"><i className="fas fa-sign-out-alt"></i>  Logout</Link> : <Link to="/login"><i className="fas fa-sign-in-alt"></i>  Login / Register</Link>}
            </ListGroup.Item>
          </ListGroup>


        </div>
      </div>
    </>
  )
}

export default Offcanvas