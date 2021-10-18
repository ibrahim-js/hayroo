import * as api from '../api'
import { CATEGORY_LIST_DROP_DOWN, FILTER_LIST_DROP_DOWN, LOADING, SEARCH_LIST_DROP_DOWN, SET_PRODUCTS, SLIDER_IMAGES } from '../constants/home'

export const fetchCategories = (setCats) => async (dispatch) => {
    try {
        const { data } = await api.fetchCategories()
        
        setCats(data.categories)
    } catch (error) {
        console.log(error)
    }
}

export const fetchSlider = () => async (dispatch) => {
    try {
        const { data } = await api.fetchSlider()
        
        dispatch({ type: SLIDER_IMAGES, payload: data.images || null })
    } catch (error) {
        console.log(error)
    }
}

export const fetchProducts = (price = null) => async (dispatch) => {
    try {
        dispatch({ type: LOADING, payload: true })

        const { data } = !price
                            ? await api.fetchProducts()
                            : await api.fetchProductsByPrice(price)
        
        dispatch({ type: SET_PRODUCTS, payload: data.products })
        dispatch({ type: LOADING, payload: false })
    } catch (error) {
        console.log(error)
    }
}

export const searchProduct = (query = null) => async (dispatch)  => {
    try {
        dispatch({ type: LOADING, payload: true })

        const { data } = await api.fetchProducts()

        const products = query
                            ? data.products.filter(product => product.pName.toLowerCase().includes(query.toLowerCase()))
                            : data.products

        dispatch({ type: LOADING, payload: false })
        dispatch({ type: SET_PRODUCTS, payload: products })
    } catch (error) {
        console.log(error)
    }
}

export const toggleCat = (payload) => {
    return { type: CATEGORY_LIST_DROP_DOWN, payload }
}

export const toggleFilter = (payload) => {
    return { type: FILTER_LIST_DROP_DOWN, payload }
}

export const toggleSearch = (payload) => {
    return { type: SEARCH_LIST_DROP_DOWN, payload }
}

export const getWishProducts = (wishList, setProducts) => async (dispatch) => {
    try {
        if (!wishList.length)
            return setProducts(null)

        const { data } = await api.cartProducts(wishList)

        setProducts(data.products)
    } catch (error) {
        console.log(error)
    }
}