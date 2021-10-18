import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Layout from './Layout'
import { updateUser } from '../../../actions/layout'

const Profile = () => {
    const data = useSelector(state => state.layout)
    const dispatch = useDispatch()

    const [fData, setFdata] = useState({
        id: data.currentUser.data.id,
        name: data.currentUser.data.name,
        email: data.currentUser.data.email,
        phone: data.currentUser.data.phone,
        success: null
    })

    const handleSubmit = () => {
        dispatch(updateUser(fData, setFdata))
    }

    if (fData.success) setTimeout(() => { setFdata({ ...fData, success: null }) }, 3000)

    if (data.loading) {
        return (
            <Layout>
                <div className="w-full md:w-9/12 my-32 flex items-center justify-center ">
                    <svg className="w-12 h-12 animate-spin text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <Fragment>
                <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
                    <div className="shadow-lg border">
                        <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">
                            Personal Information
                        </div>
                        
                        <hr />

                        <div className="py-4 px-4 md:px-8 lg:px-16 flex flex-col space-y-4">
                            {fData.success && <div className="bg-green-200 px-4 py-2 rounded">{fData.success}</div>}

                            <div className="flex flex-col space-y-2">
                                <label htmlFor="name">Name</label>
                                <input
                                    onChange={(e) => setFdata({ ...fData, name: e.target.value })}
                                    value={fData.name}
                                    type="text"
                                    className="border px-4 py-2 w-full focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    value={fData.email}
                                    readOnly
                                    type="email"
                                    id="email"
                                    className="cursor-not-allowed border px-4 py-2 bg-gray-200 w-full focus:outline-none focus:cursor-not-allowed"
                                />

                                <span className="text-xs text-gray-500">
                                    You can't change your email
                                </span>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label htmlFor="number">Phone Number</label>
                                <input
                                    onChange={(e) => setFdata({ ...fData, phone: e.target.value })}
                                    value={fData.phone}
                                    type="number"
                                    id="number"
                                    className="border px-4 py-2 w-full focus:outline-none"
                                />
                            </div>

                            <div
                                onClick={handleSubmit}
                                style={{ background: "#303031" }}
                                className="w-full text-center cursor-pointer px-4 py-2 text-gray-100"
                            >
                                Update Information
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        </Layout>
    )
}

export default Profile
