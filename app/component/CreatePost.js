import Axios from "axios"
import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Page from "./Page"
import DispatchContext from "../DispatchContext"

function CreatePost(props) {
  const [title, setTitle] = useState()
  const [post, setPost] = useState()
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)

  async function handlePostSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/api/posts", {
        title,
        content: post,
        description: "Hard coded description."
      })

      console.log("After creating the post", response.data)
      const _id = response.data.id
      appDispatch({ type: "flashmessage", value: "Congrats! You Successfuly created a Post" })
      navigate(`/post/${id}`)

      //redirect to new Post
    } catch (e) {
      console.log("There was problem in creating a post")
    }
  }

  return (
    <Page title="Create New Post">
      <form onSubmit={handlePostSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={e => setPost(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default CreatePost
