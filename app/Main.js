import React, { useEffect, useState, useReducer } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Axios from "axios"
/////////////////////////////////////////////
import FlashMessages from "./component/FlashMessages"
import ViewSinglePost from "./component/ViewSinglePost"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

Axios.defaults.baseURL = "http://localhost:8080"

//My Component
import Header from "./component/Header"
import HomeGuest from "./component/HomeGuest"
import Footer from "./component/Footer"
import About from "./component/About"
import Terms from "./component/Terms"
import Home from "./component/Home"
import CreatePost from "./component/CreatePost"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: []
  }
  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        return {
          loggedIn: true,
          flashMessages: state.flashMessages
        }
      case "logout":
        return {
          loggedIn: false,
          flashMessages: state.flashMessages
        }
      case "flashmessage":
        return {
          loggedIn: state.loggedIn,
          flashMessages: state.flashMessages.concat(action.value)
        }
    }
  }

  const [state, diapatch] = useReducer(ourReducer, initialState)

  console.log("State:", state)
  //const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))
  //const [flashMessages, setFlashMessages] = useState([])

  // function addFlasgMsg(msg) {
  //   setFlashMessages(prev => prev.concat(msg))
  // }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={diapatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/:id" element={<ViewSinglePost />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))
if (module.hot) {
  module.hot.accept()
}
