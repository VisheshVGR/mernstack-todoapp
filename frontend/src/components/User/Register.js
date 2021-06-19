import React, { useState, useEffect } from "react"
import axios from "axios"
import { Form, Col, Button } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'

import Loading from "../Helper/Loading"



const Register = () => {
    const history = useHistory()

    // useState
    const [firstName, setFname] = useState("")
    const [lastName, setLname] = useState("")
    const [email, setNewEmail] = useState("")
    const [password, setNewPass] = useState("")

    //loading
    const [loading, setLoading] = useState(false)
    let disp = (loading) ? { display: "inline-block" } : { display: "none" }

    //warning message
    const notify = (msg) => toast(msg, { position: toast.POSITION.BOTTOM_RIGHT })
    const success = (msg) => toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT })

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
        e.preventDefault();
        setLoading(true)

        const sendData = async () => {
            try {
                await axios.post(`/api/user/createNew`, {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                })
                setLoading(false)
                success("You are succesfully registered!")
                success("Proceed to Login")

            } catch (err) {
                setLoading(false)
                if (err.response.status === 422) {
                    return notify(err.response.data.message)
                }
                notify("Something went wrong")
                console.error(err.response.data)
            }
        }
        sendData()
    }


    //Main render Function==========================================================================
    return (
        <>
            <div className="user_cont">
                <h1 className="text-black pt-3 text-center"><Link to="/" className="homelink"><i className="fas fa-calendar-check"></i> Todo App</Link></h1>

                <nav className="my-4">
                    <Link to="/login">
                        <Button
                            variant="outline-dark"
                            className="rounded-0 border-0 w-50">
                            Login
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button
                            variant="dark"
                            className="rounded-0 border-0 w-50">
                            Register
                        </Button>
                    </Link>
                    <hr className="m-0 border-0" style={{ color: "#343a40", opacity: "1", height: "5px" }} />
                </nav>


                <Form className="p-3" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Control value={firstName} disabled={loading} onChange={(e) => setFname(e.target.value)} placeholder="First name" />
                            </Col>
                            <Col>
                                <Form.Control value={lastName} disabled={loading} onChange={(e) => setLname(e.target.value)} placeholder="Surname" />
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setNewEmail(e.target.value)}
                            disabled={loading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setNewPass(e.target.value)}
                            disabled={loading}
                        />
                    </Form.Group>
                    <Button variant="primary" disabled={loading} className="btn-block py-2" type="submit">Register</Button>
                </Form>


                <ToastContainer />

                <Loading disp={disp} />
            </div>
        </>
    )
}
export default Register;
