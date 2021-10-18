import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'

import { register } from '../../../actions/layout'

const Signup = ({ setLogin }) => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '', cPassword: '', error: null, success: null })
    
    const dispatch = useDispatch()

    const authInputHandle = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value, success: null, error: {} })
    }

    const authHandleSubmit = (e) => {
        e.preventDefault()

        dispatch(register(userData, setUserData, setLogin))
    }

    const alert = (msg, type) => <div className={`text-sm text-${type}-500`}>{msg}</div>

    return (
        <Fragment>
            <div className="text-center text-2xl mb-6">Register</div>

            <form autoComplete="off" className="space-y-4">
                {userData.success && alert(userData.success, "green")}
                {userData.error && typeof userData.error === 'string' && alert(userData.error, "red")}

                <div className="flex flex-col">
                    <label htmlFor="name">
                        Name
                        <span className="text-sm text-gray-600 ml-1">*</span>
                    </label>
                    <input onChange={authInputHandle} value={userData.name} name="name" type="text" id="name" className={`${userData.error?.name ? "border-red-500" : ""} px-4 py-2 focus:outline-none border`}/>
                    {userData.error?.name && alert(userData.error?.name, "red")}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email">
                        Email address
                        <span className="text-sm text-gray-600 ml-1">*</span>
                    </label>
                    <input onChange={authInputHandle} value={userData.email} name="email" type="email" id="email" className={`${userData.error?.email ? "border-red-500" : ""} px-4 py-2 focus:outline-none border`} />
                    {userData.error?.email && alert(userData.error?.email, "red")}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password">
                        Password
                        <span className="text-sm text-gray-600 ml-1">*</span>
                    </label>
                    <input onChange={authInputHandle} value={userData.password} name="password" type="password" id="password" className={`${userData.error?.password ? "border-red-500" : ""} px-4 py-2 focus:outline-none border`}/>
                    {userData.error?.password && alert(userData.error?.password, "red")}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="cPassword">
                        Confirm password
                        <span className="text-sm text-gray-600 ml-1">*</span>
                    </label>
                    <input onChange={authInputHandle} value={userData.cPassword} name="cPassword" type="password" id="cPassword" className={`${userData.error?.cPassword ? "border-red-500" : ""} px-4 py-2 focus:outline-none border`}/>
                    {userData.error?.cPassword && alert(userData.error?.cPassword, "red")}
                </div>

                <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
                    <div>
                        <input type="checkbox" id="rememberMe" className="px-4 py-2 focus:outline-none border mr-1" />
                        <label htmlFor="rememberMe">
                            Remember me
                            <span className="text-sm text-gray-600">*</span>
                        </label>
                    </div>
                    <a className="block text-gray-600" href="/">Lost your password?</a>
                </div>

                <div onClick={authHandleSubmit} style={{ background: "#303031" }} className="px-4 py-2 text-white text-center cursor-pointer font-medium">Create an account</div>
            </form>
        </Fragment>
    )
}

export default Signup
