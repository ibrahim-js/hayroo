import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { authError, login } from '../../../actions/layout'

const Login = () => {
    const history = useHistory()
    const [userData, setUserData] = useState({ email: '', password: '', error: false })

    const dispatch = useDispatch()
    const data = useSelector(state => state.layout)

    const authInputHandle = (e) => {
        dispatch(authError(null))
        setUserData({ ...userData, [e.target.name]: e.target.value, error: false })
    }

    const authFormSubmit = (e) => {
        e.preventDefault()
        
        dispatch(login(userData, setUserData, history))
    }

    const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>

    return (
        <Fragment>
            <div className="text-center text-2xl mb-6">Login</div>
            {data.authError && <div className="bg-red-200 py-2 px-4 rounded">You need to login for checkout. Haven't accont? Create new one.</div>}

            <form autoComplete="off" className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name">
                        Username or email address
                        <span className="text-sm text-gray-600 ml-1">*</span>
                    </label>
                    <input onChange={authInputHandle} value={userData.email} name="email" type="text" id="name" className={`${!userData.error ? "" : "border-red-500"} px-4 py-2 focus:outline-none border`} />
                    {userData.error && alert(userData.error)}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password">
                        Password
                        <span className="text-sm text-gray-600 ml-1">*</span>
                    </label>
                    <input onChange={authInputHandle} value={userData.password} name="password" type="password" id="password" className={`${!userData.error ? "" : "border-red-500"} px-4 py-2 focus:outline-none border`}/>
                    {userData.error && alert(userData.error)}
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

                <div onClick={authFormSubmit} style={{ background: "#303031" }} className="font-medium px-4 py-2 text-white text-center cursor-pointer">Login</div>
            </form>
        </Fragment>
    )
}

export default Login
