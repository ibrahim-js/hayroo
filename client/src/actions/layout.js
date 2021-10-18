import * as api from '../api'
import { AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT, AUTH_MODAL, CART_MODAL, CART_PRODUCT, CART_TOTAL, IN_CART, LOADING, NAVBAR_TOGGLE, ORDER_SUCCESS, USER_ORDERS } from '../constants/layout'

export const navbarToggle = (payload) => {
    return { type: NAVBAR_TOGGLE, payload }
}

export const authModalOpen = (payload) => {
    return { type: AUTH_MODAL, payload }
}

export const cartModalOpen = (payload) => {
    return { type: CART_MODAL, payload }
}

export const authError = (payload) => {
    return { type: AUTH_ERROR, payload }
}

export const orderSuccess = (payload) => {
    return { type: ORDER_SUCCESS, payload }
}

export const logout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('cart')
    localStorage.removeItem('wishList')

    return { type: AUTH_LOGOUT }
}

export const login = (userData, setUserData, history) => async (dispatch) => {
    const authData = { email: userData.email, password: userData.password }

    try {
        const { data } = await api.signin(authData)

        if (!data.token)
            return setUserData({ ...userData, password: '', error: data.error })

        
        localStorage.setItem('jwt', JSON.stringify(data.token))

        dispatch({
            type: AUTH_LOGIN,
            payload: {
                data: {
                    id: data.user._id,
                    name: data.user.name,
                    email: data.user.email,
                    phone: data.user.phone
                },
                isAdmin: data.user.role === 1,
            }
        })

        setUserData({ ...userData, email: '', password: '' })

        dispatch({ type: AUTH_MODAL, payload: false })

        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const register = (userData, setUserData, setLogin) => async (dispatch) => {
    const { name, email, password, cPassword } = userData
    const authData = { name, email, password, cPassword }

    if (password !== cPassword)
        return setUserData({
            ...userData,
            error: {
                password: 'Passwords do not match',
                cPassword: 'Passwords do not match'
            } 
        })

    try {
        const { data } = await api.signup(authData)

        if (data.error)
            return setUserData({ ...userData, error: data.error })

        if (data.success) {
            setUserData({ name: '', email: '', password: '', cPassword: '', error: null, success: data.success })
            setTimeout(() => {
                setLogin(true)
            }, 5000)
        }
    } catch (error) {
        setUserData({ ...userData, error: 'Something went wrong' })
    }
}

export const initCart = () => async (dispatch) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    if (!cart) {
        dispatch({ type: IN_CART, payload: null })
        dispatch({ type: CART_PRODUCT, payload: null })
        dispatch({ type: CART_TOTAL, payload: null })
        return
    }

    const productsID = cart.map(product => product.id)
    const totalCost = cart.reduce((acc, prod) => acc + (prod.quantity * prod.price), 0)

    try {
        const { data } = await api.cartProducts(productsID)

        const productsInCart = data.products?.map(product => {
            const { _id, pName, pPrice, pImages } = product
            const qtyInCart = cart.filter(product => product.id === _id)[0].quantity

            return { _id, pName, pPrice, pImages, qtyInCart }
        })

        dispatch({ type: CART_PRODUCT, payload: productsInCart })
        dispatch({ type: IN_CART, payload: productsID })
        dispatch({ type: CART_TOTAL, payload: totalCost })
    } catch (error) {
        console.log(error)
    }    
}

export const currentUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING, payload: true })

        const { data } = await api.currentUser()

        if (data.error) {
            localStorage.removeItem('jwt')
            return dispatch({ type: AUTH_LOGOUT })
        }

        if (data.success) {
            dispatch({ type: AUTH_LOGIN, payload: {
                isAdmin: data.user.role === 1,
                data: {
                    id: data.user._id,
                    name: data.user.name,
                    email: data.user.email,
                    phone: data.user.phone || ''
                }
            } })
            dispatch({ type: LOADING, payload: false })
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = (fData, setFdata) => async (dispatch) => {
    const formData = {
        uId: fData.id,
        name: fData.name,
        phoneNumber: fData.phone
    }

    try {
        dispatch({ type: LOADING, payload: true })

        const { data } = await api.updateUser(formData)

        if(data.success) {
            dispatch({ type: LOADING, payload: false })
            
            dispatch(currentUser())
            
            setFdata({ ...fData, success: data.success })
        }

        dispatch({ type: LOADING, payload: false })
    } catch (error) {
        console.log(error)
    }
}

export const orderByUser = (uId) => async (dispatch) => {
    try {
        dispatch({ type: LOADING, payload: true })

        const { data } = await api.orderByUser(uId)

        if (data.order) dispatch({ type: USER_ORDERS, payload: data.order })

        dispatch({ type: LOADING, payload: false })
    } catch (error) {
        console.log(error)
    }
}