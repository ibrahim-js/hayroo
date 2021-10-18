import { ADD_PRODUCT_MODAL, EDIT_PRODUCT_MODAL_CLOSE, EDIT_PRODUCT_MODAL_OPEN, FETCH_PRODUCTS_AND_CHANGE_STATE, LOADING, MENU, PRODUCT_DETAILS, PRODUCT_LOADING } from '../constants/product'

const initState = {
    loading: false,
    menu: true,
    product: null,
    products: [],
    addProductModal: false,
    editProductModal: {
        modal: false,
        pId: "",
        pName: "",
        pDescription: "",
        pImages: null,
        pStatus: "",
        pCategory: "",
        pQuantity: "",
        pPrice: "",
        pOffer: ""
    },
    productLoading: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.payload }
        
        case MENU:
            return { ...state, menu: action.payload }

        case PRODUCT_DETAILS:
            return { ...state, product: action.payload }

        // MANAGE PRODUCTS
        case PRODUCT_LOADING:
            return {
                ...state,
                productLoading: action.payload
            }

        case FETCH_PRODUCTS_AND_CHANGE_STATE:
            return {
                ...state,
                products: action.payload
            }

        case ADD_PRODUCT_MODAL:
            return {
                ...state,
                addProductModal: action.payload
            }

        case EDIT_PRODUCT_MODAL_OPEN:
            return {
                ...state,
                editProductModal: {
                    modal: true,
                    pId: action.product.pId,
                    pName: action.product.pName,
                    pDescription: action.product.pDescription,
                    pImages: action.product.pImages,
                    pStatus: action.product.pStatus,
                    pCategory: action.product.pCategory,
                    pQuantity: action.product.pQuantity,
                    pPrice: action.product.pPrice,
                    pOffer: action.product.pOffer
                }
            }
        
        case EDIT_PRODUCT_MODAL_CLOSE:
            return {
                ...state,
                editProductModal: {
                    modal: false,
                    pId: "",
                    pName: "",
                    pDescription: "",
                    pImages: null,
                    pStatus: "",
                    pCategory: "",
                    pQuantity: "",
                    pPrice: "",
                    pOffer: ""
                }
            }

        default:
            return state
    }
}

export default reducer