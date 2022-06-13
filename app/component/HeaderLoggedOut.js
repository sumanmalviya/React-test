import Axios from "axios"
import React, { useEffect, useState, useContext } from "react"
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react"
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js"

const oktaAuth = new OktaAuth({
  issuer: "https://{YourOktaDomain}/oauth2/default",
  clientId: "{ClientId}",
  redirectUri: window.location.origin + "/callback"
})

import DispatchContext from "../DispatchContext"

function HeaderLoggedOut(props) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const appDispatch = useContext(DispatchContext)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const rsponse = await Axios.post("/api/auth/login", {
        username,
        password
      })

      if (rsponse.data) {
        appDispatch({ type: "login" })
        localStorage.setItem("complexappToken", rsponse.data.token)
        localStorage.setItem("complexappUsername", rsponse.data.username)
      } else {
        console.log("Incorrect Username/Password")
      }
    } catch (e) {
      console.log("Some error occured")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
        <div>
          <button className="btn btn-success btn-sm">Sign in using Okta</button>
        </div>
      </div>
    </form>
  )
}

export default HeaderLoggedOut
