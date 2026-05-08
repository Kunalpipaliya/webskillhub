import axios from 'axios'
import { Form, Formik, Field } from 'formik'
import React, { useEffect, useState } from 'react'

const Notice = ({ currentUser }) => {
    const [ini, setIni] = useState({
        title: "",
        content: "",
        user: currentUser._id
    })
    const [editIndex, setEditIndex] = useState(null)
    const [notice, setNotice] = useState([])
    const fetchNotice = () => {
        axios.get("http://localhost:3001/notice/viewNotice")
            .then((res) => {
                setNotice(res.data.data)

            })
            .catch((err) => {
                console.log(err);

            })
    }
    const [openform, setOpenForm] = useState(false)
    // const [loading, setLoading] = useState(true)
    const handleNotice = (values, { resetForm }) => {
        if (editIndex !== null) {
            axios.patch(`http://localhost:3001/notice/updateNotice/${editIndex}`,values)
            .then(()=>{
                console.log("notice updated successfully");
                fetchNotice()
                setOpenForm(false)
                setEditIndex(false)
                
            })
            .catch((err)=>{

                console.log(err);
                
            })
        }
        else {

            axios.post("http://localhost:3001/notice/createNotice", values)
                .then(() => {
                    console.log("published post success");

                    resetForm()
                    fetchNotice()
                    setOpenForm(false)
                })
                .catch((err) => {
                    console.log(err);

                })
        }
    }
    const seeNotice = (id) => {
        window.open(`http://localhost:3001/notice/downloadNotice/${id}`, '_blank')

    }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/notice/deleteNotice/${id}`)
            .then(() => {
                console.log("notice deleted successfully");
                fetchNotice()
            })
            .catch((err) => {
                console.log(err);

            })
    }
    const handleUpdate = (item) => {
        setOpenForm(true)
        setIni({
            title: item.title,
            content: item.content,
            user: currentUser._id
        })
        setEditIndex(item._id)
    }

    useEffect(() => {

        fetchNotice()
    }, [])
    return (
        <div>
            {
                currentUser.roll === "admin" ?
                    <Formik
                        initialValues={ini}
                        enableReinitialize
                        onSubmit={handleNotice}
                    >
                        {openform ? <div className='d-flex justify-content-center align-items-center' style={{ height: "80vh" }}>

                            <Form className='col-12 col-md-4 col-lg-5 p-4 shadow-lg bg-white rounded' >
                                <h3 className="text-center mb-4">{editIndex===null?"Add notice":"Update Notice"}</h3>
                                <div className="form-group mb-3">
                                    <lable className="form-label">title</lable>
                                    <Field name="title" placeholder="Title" className="form-control"></Field>
                                </div>
                                <div className="form-group mb-3">
                                    <lable className="form-label">Content</lable>
                                    <Field name="content" placeholder="content" className="form-control"></Field>
                                </div>
                                <button className="btn btn-primary w-100" type='submit'>{editIndex===null?"Publish":"Update"}</button>
                            </Form>
                        </div>
                            :
                            <div>
                                <div className='d-flex justify-content-end'>

                                    <button className="btn btn-primary px-3" type='button' onClick={() => setOpenForm(true)}><i class="fa-solid fa-plus"></i> Add Notice</button>
                                </div>
                                {
                                    notice.map((item, index) => {
                                        return (
                                            <div key={item._id} className='bg-light   p-2   rounded shadow-sm my-2 d-flex justify-content-between align-items-center'>
                                                <strong>{item.title}</strong>
                                                <div className='d-flex gap-2 align-items-center bg-white p-1 px-2    rounded shadow-sm'>

                                                    <i className="fa-solid fa-eye text-info" onClick={() => seeNotice(item._id)}></i>
                                                    <span className='text-secondary'>|</span>
                                                    <i class="fa-solid fa-trash-can text-danger" onClick={() => handleDelete(item._id)} ></i>
                                                    <span className='text-secondary'>|</span>
                                                    <i class="fa-solid fa-pen-to-square text-primary" onClick={() => handleUpdate(item)}></i>
                                                </div>

                                            </div>
                                        )
                                    })}
                            </div>
                        }
                    </Formik>
                    :
                    <div>
                        <h3 className='fw-bold'>Notice</h3>
                        {
                                    notice.map((item, index) => {
                                        return (
                                            <div key={item._id} className='bg-light   p-2  rounded shadow-sm my-2 d-flex justify-content-between align-items-center'>
                                                <strong>{item.title}</strong>
                                                <div className='d-flex gap-2 align-items-center bg-white p-1 px-2    rounded shadow-sm'>

                                                    <i className="fa-solid fa-eye text-info" onClick={() => seeNotice(item._id)}></i>
                                                    
                                                </div>

                                            </div>
                                        )
                                    })}
                    </div>
            }
        </div>
    )
}

export default Notice
