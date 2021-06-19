import React, { useState, useEffect } from "react"
import axios from "axios"
import Offcanvas from "../Helper/Offcanvas"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import Loading from "../Helper/Loading"


const Home = () => {
    const [firstName, setFirstName] = useState("")

    //loading
    const [loading, setLoading] = useState(false)
    let disp = (loading) ? { display: "inline-block" } : { display: "none" }
    // checking whether user is logged in or not
    useEffect(() => {
        const auth = async () => {
            try {
                setLoading(true)
                const auth = await axios.get(`/api/user/userlogin`,
                    { withCredentials: true })
                setFirstName(auth.data.firstName)
                setLoading(false)
                // console.log(auth.data)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        auth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Main render Function==========================================================================
    return (
        <>
            <div className="user_cont" >
                <h1 className="text-black pt-3 text-center"><Link to="/" className="homelink"><i className="fas fa-calendar-check"></i> Todo App</Link></h1>

                <nav className="my-4">
                    <Link to="/contactus">
                        <Button
                            variant="dark"
                            className="rounded-0 border-0 w-100">
                            <i className="fas fa-envelope"></i> Contact Us
                        </Button>
                    </Link>
                    <hr className="m-0 border-0" style={{ color: "#343a40", opacity: "1", height: "5px" }} />
                </nav>



                <ul className="border-0 h5 p-3 text-center" style={{ listStyle: "none", wordBreak: "normal" }}>
                    <li><a href="www.linkedin.com/in/vishesh-vgr" className="acontact" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
                    <li><a href="https://github.com/VisheshVGR" className="acontact" rel="noopener noreferrer" target="_blank"><i className="fab fa-github-square"></i> GitHub</a></li>
                    <li><a href="https://www.instagram.com/vishesh22_17/" className="acontact" rel="noopener noreferrer" target="_blank"><i className="fab fa-instagram-square"></i> Instagram</a></li>
                    <li><a href="https://www.facebook.com/vishesh.22.17" className="acontact" rel="noopener noreferrer" target="_blank"><i className="fab fa-facebook-square"></i> Facebook</a></li>
                </ul>

                <Offcanvas name={firstName} />
                <Loading disp={disp} />
            </div>
        </>
    )
}
export default Home;
