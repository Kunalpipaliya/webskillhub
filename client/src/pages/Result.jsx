import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
const Result = ({ currentUser }) => {
  const [ini, setIni] = useState({
    student: "",
    s1: '',
    s2: '',
    s3: ''
  })
  const [result, setResult] = useState([])
  const fetchResult = () => {
    axios.get("http://localhost:3001/results/viewResult")
      .then((res) => {
        console.log(res.data.data);

        setResult(res.data.data)
      })
      .catch((err) => {
        console.log(err);

      })
  }
  const handleResult = (values, { resetForm }) => {
    axios.post("http://localhost:3001/results/createResult", values)
      .then(() => {
        console.log("result created successfully");
        fetchResult()
      })
      .catch((err) => {
        console.log(err);

      })
  }

  useEffect(() => {
    fetchResult()
  }, [])
  const currentUserResult = result.find((r) => r.student === currentUser._id)
  return (
    <div>
      {
        currentUser.roll === "admin" ?
          <Formik
            initialValues={ini}
            onSubmit={handleResult}
          >
            <Form>
              <Field className="form-control mb-3" placeholder="enter ID of student" name="student" type="string"></Field>
              <Field className="form-control mb-3" placeholder="marks of s1" name="s1" type="number"></Field>
              <Field className="form-control mb-3" placeholder="marks of s2" name="s2" type="number"></Field>
              <Field className="form-control mb-3" placeholder="marks of s3" name="s3" type="number"></Field>
              <button className="btn btn-primary p-2 px-3" type='submit'>Create Result</button>
            </Form>
          </Formik> :
          <div className="bg-light p-4 shadow-lg rounded-4">
           {
            currentUserResult?
            <div>
              <h1 className='text-center'>WebSkillHub</h1>
              <hr />
              <p><strong>Student name: </strong>{currentUserResult.studentInfo.username}</p>
              <table border={1}>
                <tr>
                  <th>Sr No.</th>
                  <th>Subject</th>
                  <th>Total Marks</th>
                  <th>Obtained Marks</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>s1</td>
                    <td>100</td>
                    <td>{currentUserResult.s1}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>s2</td>
                    <td>100</td>
                    <td>{currentUserResult.s2}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>s3</td>
                    <td>100</td>
                    <td>{currentUserResult.s3}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td><strong>300</strong></td>
                  <td><strong>{currentUserResult.Sum}</strong></td>
                </tr>
              </table>
              <p><strong>Percentage: </strong>{(currentUserResult.Sum/3).toFixed(2)}%</p>
            </div>
            : 
            <p>no result published</p>
           }
          </div>
      }
    </div>
  )
}

export default Result
