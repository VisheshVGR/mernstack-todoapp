import React, { useState, useEffect } from "react"
import Offcanvas from "../Helper/Offcanvas"
import { Link } from "react-router-dom"
import axios from "axios"

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
            <div className="user_cont">
                <h1 className="text-black pt-3 text-center"><Link to="/" className="homelink"><i className="fas fa-calendar-check"></i> Todo App</Link></h1>

                This is about us page (Work In Progress...)

                <Offcanvas name={firstName} />
                <Loading disp={disp} />

            </div>
        </>
    )
}
export default Home;
