import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./okta-component/App"

function MainOkta() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(<MainOkta />, document.querySelector("#app"))
if (module.hot) {
  module.hot.accept()
}
