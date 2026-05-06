import React from 'react'

const Result = ({currentUser}) => {
  return (
    <div>
        {
            currentUser.roll==="admin"?
            <strong>create result</strong>:
            <strong>Result</strong>
        }
    </div>
  )
}

export default Result
