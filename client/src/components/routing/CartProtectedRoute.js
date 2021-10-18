import React from 'react'
import { Route, Redirect } from  'react-router-dom'
import { useSelector } from 'react-redux'

const CartProtectedRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useSelector(state => state.layout)

    const isCartEmpty = JSON.parse(localStorage.getItem('cart')) === null

    if (currentUser.loading)
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
            { ...rest }
            render={
                (props) => currentUser.isLoggedIn && !isCartEmpty
                    ? <Component { ...props } />
                    : <Redirect to={{
                            pathname: '/',
                            state: {
                                from: props.location
                            } 
                        }}
                    />
            }
        />
    )
}

export default CartProtectedRoute
