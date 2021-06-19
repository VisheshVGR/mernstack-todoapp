import React, { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import Loading from "../Helper/Loading"
import { useHistory } from "react-router-dom"


const User = () => {
  // useState
  const [email, setMail] = useState("")
  const [password, setPass] = useState("")

  const history = useHistory();


  //loading
  const [loading, setLoading] = useState(false)
  let disp = (loading) ? { display: "inline-block" } : { display: "none" }

  //warning message
  const notify = (msg) => toast(msg, { position: toast.POSITION.BOTTOM_RIGHT })


  // checking whether user is logged in or not
  useEffect(() => {
    const auth = async () => {
      try {
        setLoading(true)
        await axios.get(`/api/user/userlogin`,
          { withCredentials: true })
        setLoading(false)
        history.push('/todo')

      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    auth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // handle functions
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const sendData = async () => {
      try {
        await axios.post(`/api/user/login`, {
          email: email,
          password: password,
        }, { withCredentials: true })

        setLoading(false)
        history.push("/todo");

      } catch (err) {
        setLoading(false)
        console.error(err.response.data)
        if (err.response.status === 422) {
          return notify(err.response.data.message)
        }
        notify("Something went wrong")

      }
    }
    sendData()
  }
  // Main render Function==========================================================================
  return (
    <>
      <div className="user_cont">
        <h1 className="text-black pt-3 text-center"><Link to="/" className="homelink"><i className="fas fa-calendar-check"></i> Todo App</Link></h1>

        <nav className="my-4">
          <Link to="/login">
            <Button
              variant="dark"
              className="rounded-0 border-0 w-50">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="outline-dark"
              className="rounded-0 border-0 w-50">
              Register
            </Button>
          </Link>
          <hr className="m-0 border-0" style={{ color: "#343a40", opacity: "1", height: "5px" }} />
        </nav>
        <Form className="p-3" onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              value={email}
              required
              onChange={(e) => setMail(e.target.value)}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              required
              disabled={loading}
              onChange={(e) => setPass(e.target.value)}

            />
          </Form.Group>
          <Button variant="primary" disabled={loading} className="btn-block py-2" type="submit">Log In</Button>
          <Link to="/forgotpass" className="d-block text-center p-2">Forgotten Password?</Link>

        </Form>

        <ToastContainer />

        <Loading disp={disp} />
      </div>
    </>
  )
}
export default User;
