import { AUTH_LOGIN, AUTH_LOGOUT, NAVBAR_TOGGLE, AUTH_MODAL, CART_MODAL, CART_PRODUCT,
         IN_CART, CART_TOTAL, AUTH_ERROR, ORDER_SUCCESS, LOADING, USER_LOADING, CLEAR_CART, USER_ORDERS } from '../constants/layout'

const initstate = {
    currentUser: {
        isLoggedIn: false,
        isAdmin: false,
        data: null,
        loading: false
    },
    userOrders: [],
    navbarHamburger: false,
    authModal: false,
    authError: false,
    cartModal: false,
    cartProduct: null,
    inCart: null,
    cartTotal: null,
    orderSuccess: false,
    loading: false
}

const reducer = (state = initstate, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: action.payload
                }
            }

        case AUTH_LOGIN:
            return {
                ...state,
                currentUser: {
                    isLoggedIn: true,
                    isAdmin: action.payload.isAdmin,
                    data: action.payload.data,
                    loading: false
                }
            }

        case AUTH_LOGOUT:
            return {
                ...state,
                currentUser: {
                    isLoggedIn: false,
                    isAdmin: false,
                    data: null,
                    loading: false
                }
            }

        case USER_ORDERS:
            return {
                ...state,
                userOrders: action.payload
            }

        case NAVBAR_TOGGLE:
            return { ...state, navbarHamburger: action.payload }

        case AUTH_MODAL:
            return { ...state, authModal: action.payload }

        case CART_MODAL:
            return { ...state, cartModal: action.payload }

        case CART_PRODUCT:
            return { ...state, cartProduct: action.payload }

        case IN_CART:
            return { ...state, inCart: action.payload }
            
        case CART_TOTAL:
            return { ...state, cartTotal: action.payload }

        case AUTH_ERROR:
            return { ...state, authError: action.payload }

        case ORDER_SUCCESS:
            return { ...state, orderSuccess: action.payload }

        case CLEAR_CART:
            return {
                ...state,
                cartProduct: null,
                cartTotal: null,
                inCart: null
            }

        case LOADING:
            return { ...state, loading: action.payload }

        default:
            return state
    }
}

export default reducer