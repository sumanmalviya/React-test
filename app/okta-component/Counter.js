import React from "react"
import { useState } from "react"

const Counter = () => {
  const [count, setCount] = useState(0)

  function playCount() {
    setCount(pre => {
      if (pre <= 0) {
        pre = 0
      } else {
        pre += 1
      }
    })
  }

  return (
    <div>
      <div>
        <button onClick={playCount}>increament count</button>
        <button onClick={playCount}>decreament count</button>
      </div>
      <div>
        <label value={count}>{count}</label>
      </div>
    </div>
  )
}

export default Counter
