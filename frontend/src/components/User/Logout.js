import React, { useEffect, useState } from "react"
import Loading from "../Helper/Loading"
import axios from "axios"
import { useHistory } from "react-router-dom"


const Logout = () => {
    const history = useHistory()
    //loading
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true)
    let disp = (loading) ? { display: "inline-block" } : { display: "none" }

    useEffect(() => {
        const logout = async () => {
            try {
                setLoading(true)
                const res = await axios('/api/user/logout', { withCredentials: true })
                console.log(res.data)
                setLoading(false)
                history.push("/login")
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        logout()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Loading disp={disp} />
        </>
    )
}

export default Logout