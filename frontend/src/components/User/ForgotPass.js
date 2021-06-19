import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import Loading from "../Helper/Loading"


const ForgotPass = () => {
    // useState
    const [email, setEmail] = useState("")

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
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        auth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // handle funstions
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        const sendData = async () => {
            try {
                const res = await axios.post('/api/user/forgetpass', {
                    email: email,
                })
                console.log(res.data)
                notify('Account found')
                setLoading(false)
            } catch (error) {
                setLoading(false)
                if (error.response.status === 422) {
                    return notify(error.response.data.message)
                }
                notify("Something went wrong")
                console.error(error.response.data)
            }
        }
        sendData()
    }


    return (
        <>
            <div className="user_cont">
                <h1 className="text-black pt-3 text-center"><Link to="/" className="homelink"><i className="fas fa-calendar-check"></i> Todo App</Link></h1>

                <nav className="my-4">
                    <Link to="/forgotpass">
                        <Button
                            variant="dark"
                            className="rounded-0 border-0 w-100">
                            Find your account
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
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </Form.Group>


                    <Button variant="primary" disabled={loading} className="btn-block py-2" type="submit">Search</Button>
                    <Link to="/login" className="d-block text-center p-2">Back To Login</Link>

                </Form>

                <ToastContainer />

                <Loading disp={disp} />
            </div>
        </>
    )
}

export default ForgotPass