import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Counter = ({ currentUser }) => {
  const [student, setStudent] = useState([])
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
  useEffect(() => {
    fetchStudent()
  }, [])
   const [notice, setNotice] = useState([])
    // const [loading, setLoading] = useState(true)
    useEffect(() => {

        const fetchNotice = () => {
            axios.get("http://localhost:3001/notice/viewNotice")
                .then((res) => {
                    setNotice(res.data.data)

                })
                .catch((err) => {
                    console.log(err);

                })
        }
        fetchNotice()
    }, [])
  return (
    <div className='d-flex gap-2 align-items-center'>
      <Link to="/dashboard/student" className={currentUser.roll==="admin"?'p-2 px-5 shadow-sm bg-light rounded d-inline-block text-center text-decoration-none text-dark':"d-none"}>
       <div >
          <h5>Students</h5>
          <p>{student.length}</p>
        </div> 
      </Link>
      <Link to="/dashboard/notice" className="p-2 px-5 shadow-sm bg-light rounded d-inline-block text-center text-decoration-none text-dark ">
        
          <h5>Notice</h5>
          <p>{notice.length}</p>
        
      </Link>

    </div >
  )
}

export default Counter