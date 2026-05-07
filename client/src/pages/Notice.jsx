import axios from 'axios'
import { Form, Formik, Field } from 'formik'
import React, { useEffect, useState } from 'react'

const Notice = ({ currentUser }) => {
    const [ini, setIni] = useState({
        title: "",
        content: "",
        user: currentUser._id
    })
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
    const handleNotice = (values, { resetForm }) => {
        axios.post("http://localhost:3001/notice/createNotice", values)
            .then(() => {
                console.log("published post success");

                resetForm()

            })
            .catch((err) => {
                console.log(err);

            })
    }
    const seeNotice = (id) => {
        window.open(`http://localhost:3001/notice/downloadNotice/${id}`, '_blank')

    }
    return (
        <div>
            {
                currentUser.roll === "admin" ?
                    <Formik
                        initialValues={ini}
                        onSubmit={handleNotice}
                    >
                        <Form className='col-12 col-md-4 col-lg-5 p-4 shadow-lg bg-white rounded'>
                            <h3 className="text-center mb-4">Add notice</h3>
                            <div className="form-group mb-3">
                                <lable className="form-label">title</lable>
                                <Field name="title" placeholder="Title" className="form-control"></Field>
                            </div>
                            <div className="form-group mb-3">
                                <lable className="form-label">Content</lable>
                                <Field name="content" placeholder="content" className="form-control"></Field>
                            </div>
                            <button className="btn btn-primary w-100" type='submit'>Publish</button>
                        </Form>
                    </Formik>
                    :
                    <div>
                        <h3 className='fw-bold'>Notice</h3>
                        {
                            notice.map((item, index) => {
                                return (
                                    <div key={item._id} className='alert alert-primary   p-2 px-4  rounded shadow-sm my-2 d-flex justify-content-between align-items-center'>
                                        <strong>{item.title}</strong>
                                        <i className="fa-solid fa-eye" onClick={() => seeNotice(item._id)}></i>
                                    </div>
                                )
                            })}
                    </div>
            }
        </div>
    )
}

export default Notice
