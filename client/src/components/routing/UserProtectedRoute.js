import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserProtectedRoute = ({ component: Component, ...rest }) => {
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
            render={(props) => 
                !data.currentUser.isLoggedIn
                    ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    : (
                        data.currentUser.isAdmin
                            ? <Redirect to={{ pathname: '/admin/dashboard', state: { from: props.location } }} />
                            : <Component {...props} />
                    )
            } 
        />
    )
}

export default UserProtectedRoute
