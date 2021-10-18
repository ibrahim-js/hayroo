import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminProtectedRoute = ({ component: Component, ...rest }) => {
    const data = useSelector(state => state.layout)

    if (data.currentUser.loading)
        return (
            <div style={{
                width: '100%',
                height: '100vh',
                display: 'grid',
                placeItems: 'center',
                fontSize: '1.1rem'
            }}>
                Loading...
            </div>
        )

    return (
        <Route
            {...rest}
            render={
                (props) =>
                    data.currentUser.isLoggedIn && data.currentUser.isAdmin
                        ? <Component {...props} />
                        : <Redirect to={{
                                pathname: '/user/profile',
                                state: { from: props.location }
                            }} 
                        />
            }
        />
    )
}

export default AdminProtectedRoute
