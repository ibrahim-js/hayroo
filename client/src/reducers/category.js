import { CATEGORY_ERROR, LOADING, SET_CATEGORY, SET_PRODUCTS,
         FETCH_CATEGORY_AND_CHANGE_STATE, ADD_CATEGORY_MODAL, EDIT_CATEGORY_MODAL_OPEN, EDIT_CATEGORY_MODAL_CLOSE, CAT_LOADING } from '../constants/category'

const initState = {
    error: null,
    category: null,
    products: null,
    loading: false,
    // ADMIN CATEGORIES
    categories: [],
    addCategoryModal: false,
    editCategoryModal: { modal: false, cId: null, des: "", status: "" },
    catLoading: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }

        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }

        case CATEGORY_ERROR:
            return {
                ...state,
                error: action.payload
            }

        // ADMIN && MANAGING CATEGORIES
        case FETCH_CATEGORY_AND_CHANGE_STATE:
            return {
                ...state,
                categories: action.payload
            }

        case ADD_CATEGORY_MODAL:
            return {
                ...state,
                addCategoryModal: action.payload
            }

        case EDIT_CATEGORY_MODAL_OPEN:
            return {
                ...state,
                editCategoryModal: {
                    modal: true,
                    cId: action.cId,
                    des: action.des,
                    status: action.status
                }
            }

        case EDIT_CATEGORY_MODAL_CLOSE:
            return {
                ...state,
                editCategoryModal: {
                    modal: false,
                    cId: null,
                    des: "",
                    status: ''
                }
            }

        case CAT_LOADING:
            return {
                ...state,
                catLoading: action.payload
            }

        default:
            return state
    }
}

export default reducer