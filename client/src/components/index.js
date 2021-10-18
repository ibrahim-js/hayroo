// LIBRARIES
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// COMPONENTS
import { Home, Wish, ProductDetails, ProductByCategory, Checkout } from './shop'
import { AdminDashboard, Categories, Orders, Products } from './admin'
import { Profile, UserOrders } from './shop/user'

// PROTECTED ROUTES
import { CartProtectedRoute, AdminProtectedRoute, UserProtectedRoute } from './routing'

// ACTIONS
import { currentUser } from '../actions/layout'
import { USER_LOADING } from '../constants/layout'

const Routes = () => {
    const dispatch = useDispatch()

    dispatch({ type: USER_LOADING, payload: true })
    
    useEffect(() => {
        dispatch(currentUser())
    }, [dispatch])

    return (
        <Router>
            <Switch>
                {/* SHOP & PUBLIC ROUTES */}
                <Route exact path='/' component={ Home } />
                <Route exact path='/wish-list' component={ Wish } />
                <Route exact path='/products/:id' component={ ProductDetails } />
                <Route exact path='/products/category/:id' component={ ProductByCategory } />
                <CartProtectedRoute exact path='/checkout' component={ Checkout } />
                {/* SHOP & PUBLIC ROUTES */}

                {/* ADMIN ROUTES */}
                <AdminProtectedRoute exact path='/admin/dashboard' component={ AdminDashboard  } />
                <AdminProtectedRoute exact path='/admin/dashboard/categories' component={ Categories  } />
                <AdminProtectedRoute exact path='/admin/dashboard/products' component={ Products  } />
                <AdminProtectedRoute exact path='/admin/dashboard/orders' component={ Orders  } />
                {/* ADMIN ROUTES */}

                {/* USER ROUTES */}
                <UserProtectedRoute exact path='/user/profile' component={ Profile } />
                <UserProtectedRoute exact path='/user/orders' component={ UserOrders } />
                <UserProtectedRoute exact path='/user/settings' component={ <h1>Hello user settings</h1> } />
                {/* USER ROUTES */}
            </Switch>
        </Router>
    )
}

export default Routes