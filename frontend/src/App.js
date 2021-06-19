import React from "react"
import { Col, Container, Row } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'

import Todo from "./components/Todo/Todo"
import Login from "./components/User/Login"
import Register from "./components/User/Register"
import Error from "./components/Error/Error"
import Home from "./components/Home/Home"
import ForgotPass from "./components/User/ForgotPass"
import Logout from "./components/User/Logout"
import ContactUs from "./components/Home/ContactUs"
import AboutUs from "./components/Home/AboutUs"
import Profile from "./components/User/Profile"


const App = () => {
  //Main render Function==========================================================================
  return (
    <>
      <Container fluid="sm" className="px-0">
        <Row className="justify-content-center main-cont">
          <Col xs="10" className="my-3">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/contactus" exact component={ContactUs}/>
              <Route path="/aboutus" exact component={AboutUs}/>
              <Route path="/login" exact component={Login} />
              <Route path="/logout" exact component={Logout}/>
              <Route path="/register" exact component={Register} />
              <Route path="/forgotpass" exact component={ForgotPass} />
              <Route path="/profile" exact component={Profile}/>
              <Route path="/todo" exact component={Todo} />
              <Route path="*" component={Error} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default App;
