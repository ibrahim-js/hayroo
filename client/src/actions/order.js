import * as api from '../api'
import { CLEAR_CART, ORDER_SUCCESS } from '../constants/layout'
import { FILTER_ORDERS, LOADING, UPDATE_ORDER_MODAL_CLOSE } from '../constants/orders'
import { initDashboard } from './dashboard'

export const placeOrder = (state, setState, allProduct, user, history) => async (dispatch) => {
    const { fullname, address, city, phone } = state

    try {
        const { data } = await api.createOrder({ allProduct, user, fullname, address, city, phone })

        if (data.error)
            return setState({ ...state, success: null, error: data.error })

        if (data.success) {
            setState({ ...state, error: null, success: data.success })

            
            
            
            setTimeout(() => {
                dispatch({ type: ORDER_SUCCESS, payload: true })
                
                dispatch({ type: CLEAR_CART })

                localStorage.removeItem('cart')

                history.push('/')
            }, 3000)
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateOrder = (oId, status) => async (dispatch) => {
    try {
        
        const { data } = await api.updateOrder({ oId, status })
        
        if (data.error) {
            dispatch({ type: UPDATE_ORDER_MODAL_CLOSE })
            return alert(data.error)
        }
        
        if (data.success) {
            dispatch({ type: UPDATE_ORDER_MODAL_CLOSE })
            dispatch({ type: LOADING, payload: true })
            dispatch(initDashboard())
            dispatch({ type: LOADING, payload: false })
        }

    } catch (error) {
        console.log(error)
    }
}

export const filterOrders = (orders, status) => (dispatch) => {
    switch (status) {
        case 'All':
            dispatch({ type: FILTER_ORDERS, payload: orders })
            break

        case 'Not processed':
            dispatch({ type: FILTER_ORDERS, payload: orders.filter(order => order.status === 'Not processed') })
            break

        case 'Processing':
            dispatch({ type: FILTER_ORDERS, payload: orders.filter(order => order.status === 'Processing') })
            break

        case 'Shipped':
            dispatch({ type: FILTER_ORDERS, payload: orders.filter(order => order.status === 'Shipped') })
            break

        case 'Delivered':
            dispatch({ type: FILTER_ORDERS, payload: orders.filter(order => order.status === 'Delivered') })
            break

        case 'Cancelled':
            dispatch({ type: FILTER_ORDERS, payload: orders.filter(order => order.status === 'Cancelled') })
            break

        default:
            dispatch({ type: FILTER_ORDERS, payload: orders })
            break
    }
}

export const deleteOrder = (oId) => async (dispatch) => {
    try {
        const { data } = await api.deleteOrder(oId)

        if (data.error)
            return alert(data.error)

        if(data.success) {
            dispatch({ type: LOADING, payload: true })

            dispatch(initDashboard())

            dispatch({ type: LOADING, payload: false })

            alert(data.success)
        }
    } catch (error) {
        console.log(error)
    }
}