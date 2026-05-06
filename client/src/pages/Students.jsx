import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
const Student=({currentUser})=>{
  const [student, setStudent] = useState([])
  const [ini, setIni] = useState({
    user:currentUser._id,
    studentname: ""
  })
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState(null)
  const fetchStudent = () => {
    axios.get("http://localhost:3001/student/student")
      .then((res) => {
        setStudent(res.data.data)
        console.log(res);

        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)

      })
  }
  const handleSubmit = (values, { resetForm }) => {
    if(values.studentname==="") return
    if (editItem) {
      axios.patch(`http://localhost:3001/student//updateStudent/${editItem._id}`, values)
        .then(() => {
          setEditItem(null)
          setIni({
            user:currentUser._id,
            studentname: ""
          })
          fetchStudent()
          resetForm()
        })
        .catch((err) => {
          console.log(err);

        })
    }
    else {

      axios.post("http://localhost:3001/student/createStudent", values)
        .then(() => {
          console.log("student saved to database");

          fetchStudent()
          resetForm()
        })
        .catch((err) => {

          console.log(err);

        })
    }
  }
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/student/deleteStudent/${id}`)
      .then(() => {
        console.log("deleted successfully");
        fetchStudent()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleUpdate = (item) => {
    setEditItem(item)
    setIni({
      studentname: item.studentname
    })
  }
  useEffect(() => {
    fetchStudent()
  }, [])
  if (loading) return <div id='loader'></div>
  return (
    <div className='container'>
      <Formik
        initialValues={ini}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="d-flex gap-2 my-3">

            <Field name="studentname" className="form-control"></Field>
            <button type="submit" className='btn btn-primary'>{editItem?"Update":"Submit"}</button>
          </div>
        </Form>
      </Formik>
      {student.length > 0 ? (
        <div>
          {student.map((item) => (

            <div key={item._id} className="d-flex justify-content-between align-items-center my-2 p-2 bg-light rounded shadow-md border border-1">
              <div className='d-flex flex-column'>

              <strong>{item.studentname}</strong>
              <span>Added by : {item.user.username}</span>
              <small className="text-muted"><strong>Enrollmentdate : </strong>{item.enrollmentDate.split("T")[0]}</small>
              </div>
              <div className='d-flex gap-2 align-items-center'>
                <i className="fa-solid fa-trash-can text-danger " onClick={() => handleDelete(item._id)}></i>
                <span className='text-secondary'>|</span>
                <i className="fa-solid fa-pen-to-square text-primary" onClick={() => handleUpdate(item)}></i>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No student found in the database.</p>
      )}
    </div>
  );
}

export default Student;
