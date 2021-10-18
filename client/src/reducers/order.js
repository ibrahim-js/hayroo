import { FETCH_ORDER_AND_CHANGE_STATE, ADD_CATEGORY_MODAL, FILTER_ORDERS, UPDATE_ORDER_MODAL_OPEN, UPDATE_ORDER_MODAL_CLOSE, LOADING } from '../constants/orders'

const initState = {
    orders: [],
    ordersInstance: [],
    addCategoryModal: false,
    updateOrderModal: {
        modal: false,
        oId: null,
        status: ""
    },
    loading: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_ORDER_AND_CHANGE_STATE:
            return {
                ...state,
                orders: action.payload
            }

        case ADD_CATEGORY_MODAL:
            return {
                ...state,
                addCategoryModal: action.payload
            }

        case UPDATE_ORDER_MODAL_OPEN:
            return {
                ...state,
                updateOrderModal: {
                    modal: true,
                    oId: action.oId,
                    status: action.status
                }
            }

        case UPDATE_ORDER_MODAL_CLOSE:
            return {
                ...state,
                updateOrderModal: {
                    modal: false,
                    oId: null,
                    status: ""
                }
            }

        case FILTER_ORDERS:
            return {
                ...state,
                ordersInstance: action.payload
            }

        case LOADING:
            return {
                ...state,
                loading: action.payload
            }

        default:
            return state
    }
}

export default reducer