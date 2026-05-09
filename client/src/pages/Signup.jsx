import React from 'react'
import { Field, Form, Formik } from 'formik'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const Signup = () => {
    const navigate = useHistory()
    const handleSubmit = (values, { resetForm }) => {
        // You MUST use FormData because your backend uses Multer
        const formdata = new FormData();
        formdata.append("username", values.username);
        formdata.append("email", values.email);
        formdata.append("password", values.password);
        formdata.append("roll", values.roll);
        // Even if profile is empty, Multer needs to handle the multipart request

        axios.post("http://localhost:3001/createUser", formdata)
            .then(() => {
                console.log("signup success");
                navigate.push("/");
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className='bg-light'>

            <div className=' d-flex justify-content-center  align-items-center container' style={{ height: "100vh" }}>
                <Formik
                    initialValues={{
                        username: "",
                        email: "",
                        password: "",
                        profile: null,
                        roll: "user"
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form className='col-12 col-md-4 col-lg-5 p-4 shadow-lg bg-white rounded'>
                        <h3 className="text-center mb-4">Signup</h3>
                        <div className="form-group mb-3">
                            <lable className="form-label">Username</lable>
                            <Field name="username" placeholder="Username" className="form-control"></Field>
                        </div>
                        <div className="form-group mb-3">
                            <lable className="form-label">Email</lable>
                            <Field name="email" type="email" placeholder="Email" className="form-control"></Field>
                        </div>
                        <div className="form-group mb-3">
                            <lable className="form-label">Password</lable>
                            <Field name="password" type="password" placeholder="Password" className="form-control"></Field>
                        </div>
                        <button className="btn btn-primary w-100" type='submit'>Sign up</button>
                    </Form>

                </Formik>
            </div>
        </div>
    )
}

export default Signup
