import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Counter = () => {
    const [student,setStudent]=useState([])
     const fetchStudent = () => {
        axios.get("http://localhost:3001/student/student")
          .then((res) => {
            setStudent(res.data.data)
            console.log(res);
    
          })
          .catch((err) => {
            console.log(err);
    
          })
      }
      useEffect(()=>{
        fetchStudent()
      },[])
  return (
    <div>
        <div className="p-2 px-5 shadow-sm bg-light rounded d-inline-block text-center">
            <h5>Students</h5>
            <p>{student.length}</p>
        </div>
    </div>
  )
}

export default Counter