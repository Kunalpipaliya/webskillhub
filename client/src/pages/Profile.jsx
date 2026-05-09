import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import axios from 'axios'

const Profile = ({ currentUser }) => {
    const pattern = /^[a-zA-Z]$/

    const [form, setForm] = useState(false)
    const handleProfileImage = (values, { resetForm }) => {
        const formdata = new FormData()
        formdata.append("email", values.email)
        formdata.append("password", values.password)
        formdata.append("roll", values.roll)
        formdata.append("username", values.username)
        if (values.profile) {
            formdata.append("profile", values.profile)
        }
        const id = currentUser._id
        axios.patch(`http://localhost:3001/updateUser/${id}`, formdata, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
            .then((res) => {
                console.log("Porfile image changed", res.data);
                localStorage.setItem("currentUser", JSON.stringify(res.data.data));
                window.location.reload()
                setForm(false)
            })
            .catch((err) => {
                console.log(err);

            })
    }
    return (
        <div className='container'>
            {form ?
                <Formik
                    initialValues={{
                        email: currentUser.email,
                        password: currentUser.password,
                        profile: null,
                        roll: currentUser.roll,
                        username: currentUser.username
                    }}
                    onSubmit={handleProfileImage}
                >
                    {({ setFieldValue }) => (
                        <div className='d-flex justify-content-center align-items-center' style={{ height: "80vh" }}>

                            <Form className='col-12 col-md-4 col-lg-5 p-4 shadow-lg bg-white rounded'>
                                <div className="mb-3">
                                    <label>Select Profile Image</label>
                                    {/* 4. Manual File Input Handling */}
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="profile"
                                        onChange={(event) => {
                                            setFieldValue("profile", event.currentTarget.files[0]);
                                        }}
                                    />
                                </div>
                                <button className="btn btn-dark" type='submit'>Update Profile</button>
                                <button className="btn btn-secondary ms-2" onClick={() => setForm(false)}>Cancel</button>
                            </Form>
                        </div>
                    )}
                </Formik>
                : <div className="row col-12 col-md-10 m-auto shadow-lg" style={{ height: "500px", borderRadius: "30px", overflow: "hidden" }} >
                    <div className="col-12 col-md-5  bg-light p-2 d-flex justify-content-center align-items-center flex-column gap-2">

                        {
                            currentUser.profile === "" ?
                                <div>

                                    <div style={{ width: "150px", height: "150px", fontSize: "80px", fontWeight: "bolder" }} className='rounded-circle bg-info text-white d-flex justify-content-center align-items-center border border-2 border-primary'>
                                        {currentUser.email.at(0).toUpperCase()}
                                    </div>

                                </div>
                                :
                                <div>

                                    <div style={{ height: "150px", width: "150px" }}>

                                        <img src={`http://localhost:3001/images/${currentUser.profile}`} alt="" width={'100%'} height={'100%'} style={{ objectFit: "cover", objectPosition: "center top" }} className='rounded-circle bg-info text-white d-flex justify-content-center align-items-center border border-2 border-primary' />
                                    </div>
                                </div>
                        }

                        <strong className='fs-5'>{currentUser.roll.toUpperCase()}</strong>
                        <button className="btn btn-outline-primary" onClick={() => setForm(true)}>{currentUser.profile === "" ? "Add Profile Image" : "Change Porfile Image"}</button>
                    </div>
                    <div className="col-12 col-md-7  p-2 d-flex justify-content-center  px-4 text-white flex-column gap-4" style={{ background: "#334456" }}>
                        <div className='d-flex gap-2 align-items-center'>
                            <strong>Username</strong> :
                            <span>{currentUser.username}</span>
                        </div>
                        <div className='d-flex gap-2 align-items-center'>
                            <strong>Email</strong> :
                            <span>{currentUser.email}</span>
                        </div>
                        {currentUser.roll === "user" ?
                            <div className='d-flex gap-2 align-items-center'>
                                <strong>SID</strong> :
                                <span>{currentUser._id.split("").map((item) => {
                                    return (
                                        item.match(pattern) ? "" : item
                                    )
                                })}
                                </span>
                            </div> : ""}
                        <div className='d-flex gap-2 align-items-center'>
                            <strong>Role</strong> :
                            <span>{currentUser.roll}</span>
                        </div>

                    </div>
                </div>}
        </div >
    )
}

export default Profile