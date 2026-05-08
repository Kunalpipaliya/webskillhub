import React from 'react'

const Profile = ({ currentUser }) => {
    const pattern = /^[a-zA-Z]$/

    return (
        <div className='container'>
            <div className="row col-12 col-md-10 m-auto shadow-lg" style={{ height: "500px", borderRadius: "30px", overflow: "hidden" }} >
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
                    <button className="btn btn-outline-primary">{currentUser.profile === ""?"Add Profile Image":"Change Porfile Image"}</button>
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
            </div>
        </div>
    )
}

export default Profile