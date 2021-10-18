import { CATEGORY_LIST_DROP_DOWN, FILTER_LIST_DROP_DOWN, LOADING, SEARCH_LIST_DROP_DOWN, SET_PRODUCTS, SLIDER_IMAGES } from '../constants/home'

const initstate = {
    categoryListDropdown: false,
    filterListDropdown: false,
    searchDropdown: false,
    products: null,
    sliderImages: [],
    loading: false
}

const reducer = (state = initstate, action) => {
    switch (action.type) {
        case CATEGORY_LIST_DROP_DOWN:
            return {
                ...state,
                categoryListDropdown: action.payload,
                filterListDropdown: false,
                searchDropdown: false
            }

        case FILTER_LIST_DROP_DOWN:
            return {
                ...state,
                filterListDropdown: action.payload,
                categoryListDropdown: false,
                searchDropdown: false
            }
        
        case SEARCH_LIST_DROP_DOWN:
            return {
                ...state,
                searchDropdown: action.payload,
                categoryListDropdown: false,
                filterListDropdown: false
            }

        case SET_PRODUCTS:
            return { ...state, products: action.payload }

        case SLIDER_IMAGES:
            return { ...state, sliderImages: action.payload }

        case LOADING:
            return { ...state, loading: action.payload }

        default:
            return state
    }
}

export default reducer