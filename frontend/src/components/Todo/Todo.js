import React, { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory, Link } from "react-router-dom"

import InputForm from "./components/InputForm"
import ListGroupItem from "./components/listGroupItem"
import TodoList from "./components/TodoList"
import Offcanvas from "../Helper/Offcanvas"
import Loading from "../Helper/Loading"


const Todo = () => {
  const history = useHistory()

  //Use States
  const [inputValue, setInputValue] = useState("")
  const [list, setList] = useState([])
  const [items, setItems] = useState("")

  const [firstName, setFirstName] = useState("")
  const [userid, setUserId] = useState()

  //loading
  const [loading, setLoading] = useState(true)
  let disp = (loading) ? { display: "inline-block" } : { display: "none" }

  //warning message
  const notify = (msg) => toast(msg, { position: toast.POSITION.BOTTOM_RIGHT });

  //Handle Functions
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()

    let data = inputValue.trim().toString()
    setInputValue("")

    const sendData = async () => {
      try {
        const res = await axios.post(`/api/todoitem/createNew`, { description: data, userid: userid })
        setList([...list, res.data])
      }
      catch (err) {
        setLoading(false)
        if (err.response.status === 422) {
          return notify(err.response.data.message)
        }
        notify(err.response.data)
      }
    }
    sendData()
  }



  useEffect(() => {
    const loadAllItem = async () => {
      try {
        setLoading(true)
        const auth = await axios.get(`/api/user/userlogin`,
          { withCredentials: true })
        setFirstName(auth.data.firstName)
        setUserId(auth.data._id)

        const res = await axios.post(`/api/todoitem/getAll`, { userid: auth.data._id })
        setList(res.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
        if (error.response.status === 401) {
          history.push('/login')
        }
      }
    }
    loadAllItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //update list on every render of list
  useEffect(() => {

    const handleDelete = (id) => {
      setLoading(true)
      const delItemReq = async () => {
        try {
          await axios.get(`/api/user/userlogin`,
            { withCredentials: true })

          const res = await axios.post(`/api/todoitem/delete`, { _id: id })
          setList(list.filter((data) => data._id !== res.data._id))

        }
        catch (err) {
          console.log(err)
          if (err.response.status === 401) {
            history.push('/login')
          }
        }
      }
      delItemReq()
    }

    const handleCheckbox = (id) => {
      setLoading(true)
      const toggleItemReq = async () => {
        try {
          await axios.get(`/api/user/userlogin`,
            { withCredentials: true })

          const res = await axios.post(`/api/todoitem/toggle`, { _id: id })
          setList(list.map((data) => {
            if (data._id === id) {
              data.checked = res.data
              return data
            }
            return data
          }))

        } catch (error) {
          console.log(error)
          if (error.response.status === 401) {
            history.push('/login')
          }
        }
      }
      toggleItemReq()
    }

    let notCheckedItems = list.map((data) => {
      if (data.checked === false) {
        return <ListGroupItem data={data} key={data._id} handleDelete={handleDelete} handleCheckbox={handleCheckbox} />
      }
      return null
    })
    let checkedItems = list.map((data) => {
      if (data.checked === true) {
        return <ListGroupItem data={data} key={data._id} handleDelete={handleDelete} handleCheckbox={handleCheckbox} />
      }
      return null
    })

    let allItems = [...notCheckedItems, ...checkedItems]

    setItems(allItems)
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])



  //Main render Function==========================================================================
  return (
    <>
      <h1 className="text-white text-center"><Link to="/" className="homelink"><i className="fas fa-calendar-check"></i> Todo App</Link></h1>
      {/* <h1 classNmae={styles.h1}>Todo App</h1> */}

      <InputForm
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        loading={loading}
      />

      <TodoList
        items={items}
      />

      <ToastContainer />
      <Loading disp={disp} />
      <Offcanvas name={firstName} />


    </>
  )
}
export default Todo;
