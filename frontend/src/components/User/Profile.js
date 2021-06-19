import React, { useState, useEffect } from "react"
import axios from "axios"
import Offcanvas from "../Helper/Offcanvas"
import { Link, useHistory } from "react-router-dom"
import { Button, Form, Row, Col, Modal } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify'
import Loading from "../Helper/Loading"


const Home = () => {
    const history = useHistory()
    const [firstName, setFirstName] = useState("")
    const [user, setUser] = useState({ _id: "", firstName: "", lastName: "", email: "" })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

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
                const auth = await axios.get(`/api/user/userlogin`,
                    { withCredentials: true })
                // console.log(auth.data)
                setUser(auth.data)
                setFirstName(auth.data.firstName)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
                history.push('/login')
            }
        }
        auth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleUpdate = async () => {
        try {
            const res = await axios.post(`/api/user/update`, {
                _id: user._id,
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
            })
            handleClose2()
            notify(res.data)
        } catch (error) {
            handleClose2()
            console.log(error)
            if (error.response.status === 422) {
                return notify(error.response.data.message)
            }
            notify("Something went wrong")
        }
    }

    const handleDelete = async () => {
        try {
            await axios.post(`/api/user/userdelete`, {
                _id: user._id,
            })
            history.push("/login")
        } catch (error) {
            console.log(error)
        }
    }

    //Main render Function==========================================================================
    return (
        <>
            <div className="user_cont">
                <h1 className="text-black pt-3 text-center"><Link to="/" className="homelink"><i className="fas fa-calendar-check"></i> Todo App</Link></h1>

                <nav className="my-4">
                    <Link to="/profile">
                        <Button
                            variant="dark"
                            className="rounded-0 border-0 w-100">
                            <i className="fas fa-user-circle"></i> Profile
                        </Button>
                    </Link>
                    <hr className="m-0 border-0" style={{ color: "#343a40", opacity: "1", height: "5px" }} />
                </nav>


                <Form className="p-3">
                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                            User Id
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" readOnly value={user._id} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                            E-mail
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" readOnly value={user.email} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                            First Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" required disabled={loading} value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                            Surname
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" required disabled={loading} value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                        </Col>
                    </Form.Group>

                    <Form.Group className="d-flex py-3 justify-content-center">
                        <Button variant="success mx-2" disabled={loading} onClick={handleShow2}>
                            Update Details
                        </Button>
                        <Button variant="danger mx-2" disabled={loading} onClick={handleShow}>
                            Delete Account
                        </Button>
                    </Form.Group>
                </Form>


                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>By proceeding, {user.firstName}'s account data will be updated as entered!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                            Close
                        </Button>
                        <Button variant="success" onClick={handleUpdate}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>By proceeding, {user.firstName}'s account will be permanently deleted with all of its data!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger " onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>


                <ToastContainer />

                <Offcanvas name={firstName} />
                <Loading disp={disp} />

            </div>
        </>
    )
}
export default Home;
