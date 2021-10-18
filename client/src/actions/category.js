import * as api from '../api'
import { ADD_CATEGORY_MODAL, CATEGORY_ERROR, CAT_LOADING, EDIT_CATEGORY_MODAL_CLOSE, FETCH_CATEGORY_AND_CHANGE_STATE, LOADING, SET_CATEGORY } from '../constants/category'
import { SET_PRODUCTS } from '../constants/home'

export const initCategoryPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: LOADING, payload: true })
        
        const productsResponse = await api.productsByCategory(id)
        const categoryResponse = await api.singleCategory(id)
        
        if (productsResponse.data?.error) {
            dispatch({ type: CATEGORY_ERROR, payload: productsResponse.data?.error })
            dispatch({ type: LOADING, payload: false })
            return
        }
        
        if (categoryResponse.data?.error) {
            dispatch({ type: CATEGORY_ERROR, payload: categoryResponse.data?.error })
            dispatch({ type: LOADING, payload: false })
            return
        }

        dispatch({ type: SET_PRODUCTS, payload: productsResponse.data.products })
        dispatch({ type: SET_CATEGORY, payload: categoryResponse.data.category })
        dispatch({ type: LOADING, payload: false })
    } catch (error) {
        console.log(error)
    }
}

export const createCategory = (fData, setFdata) => async (dispatch) => {
    dispatch({ type: CAT_LOADING, payload: true })
    
    if (!fData.cImage) {
        dispatch({ type: CAT_LOADING, payload: true })
        return setFdata({ ...fData, error: 'Please provide a category image' })
    }

    const formData = new FormData()
    formData.append("cImage", fData.cImage)
    formData.append("cName", fData.cName)
    formData.append("cDescription", fData.cDescription)
    formData.append("cStatus", fData.cStatus)

    try {
        const { data } = await api.createCategory(formData)

        if (data.success) {
            const catsData = await api.fetchCategories()
            dispatch({ type: FETCH_CATEGORY_AND_CHANGE_STATE, payload: catsData.data.categories })
            setFdata({ ...fData, cName: "", cDescription: "", cImage: "", cStatus: "Active", success: data.success, error: null })
            return dispatch({ type: CAT_LOADING, payload: false })
        }

        if (data.error) {
            setFdata({ ...fData, error: data.error, success: null })
            return dispatch({ type: CAT_LOADING, payload: false })
        }
    } catch (error) {
        console.log(error)
    }
}

export const addCatModal = (payload) => {
    return { type: ADD_CATEGORY_MODAL, payload }
}

export const editCategory = (cId, des, status) => async (dispatch) => {
    dispatch({ type: CAT_LOADING, payload: true })

    try {
        const { data } = await api.editCategory({ cId, cDescription: des, cStatus: status })

        if (data.error) {
            console.log(data.error)

            return dispatch({ type: CAT_LOADING, payload: false })
        }

        if (data.success) {
            console.log(data.success)
            
            const catsData = await api.fetchCategories()

            dispatch({ type: FETCH_CATEGORY_AND_CHANGE_STATE, payload: catsData.data.categories })

            dispatch({ type: EDIT_CATEGORY_MODAL_CLOSE })

            return dispatch({ type: CAT_LOADING, payload: false })
        }
    } catch (error) {
        console.log(error)
    }
}

export const initManageCats = () => async (dispatch) => {
    try {
        dispatch({ type: CAT_LOADING, payload: true })

        const { data } = await api.fetchCategories()

        dispatch({ type: FETCH_CATEGORY_AND_CHANGE_STATE, payload: data.categories })

        dispatch({ type: CAT_LOADING, payload: false })
    } catch (error) {
        console.log(error)
    }
}

export const deleteCategory = (cId) => async (dispatch) => {
    try {
        dispatch({ type: CAT_LOADING, payload: true })

        const { data } = await api.deleteCategory(cId)

        if (data.error) {
            console.log(data.error)
            return dispatch({ type: CAT_LOADING, payload: false })
        }

        if (data.message) {
            const catsData = await api.fetchCategories()

            dispatch({ type: FETCH_CATEGORY_AND_CHANGE_STATE, payload: catsData.data.categories })
            
            return dispatch({ type: CAT_LOADING, payload: false })
        }
    } catch (error) {
        
    }
}