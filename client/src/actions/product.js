import * as api from '../api'
import { ADD_PRODUCT_MODAL, FETCH_PRODUCTS_AND_CHANGE_STATE, LOADING, MENU, PRODUCT_DETAILS, PRODUCT_LOADING } from '../constants/product'

export const initProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: LOADING, payload: true })

        const { data } = await api.singleProduct(id)

        dispatch({ type: PRODUCT_DETAILS, payload: data.product })
        dispatch({ type: LOADING, payload: false })
    } catch (error) {
        console.log(error)
    }
}

export const menuHandle = (payload) => {
    return { type: MENU, payload }
}

export const reviewProduct = (reviewData, fData, setFdata) => async (dispatch) => {
    try {
        const { data } = await api.reviewProduct(reviewData)

        if (data.error)
            return setFdata({ ...fData, error: data.error, success: null })

        if (data.success) {
            dispatch({ type: PRODUCT_DETAILS, payload: data.product })
            setFdata({ rating: '', review: '', error: null, success: data.success })
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteProductReview = (reviewData, fData, setFdata) => async (dispatch) => {
    try {
        const { data } = await api.deleteProductReview(reviewData)

        if (data.error)
            return setFdata({ ...fData, error: data.error, success: null })

        if (data.success) {
            dispatch({ type: PRODUCT_DETAILS, payload: data.product })
            setFdata({ ...fData, success: data.success, error: null })
        }
    } catch (error) {
        console.log(error)
    }
}

// MANAGING PRODUCTS
export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LOADING, payload: true })

        const { data } = await api.fetchProducts()

        if (data.products) {
            dispatch({ type: FETCH_PRODUCTS_AND_CHANGE_STATE, payload: data.products })

            dispatch({ type: PRODUCT_LOADING, payload: false })
        }
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = (fData, setFdata) => async (dispatch) => {
    const { pName, pDescription, pImage, pStatus, pCategory, pQuantity, pPrice, pOffer } = fData
    
    const formData = new FormData()
    
    for (const file of pImage) formData.append('pImage', file)
    formData.append('pName', pName)
    formData.append('pDescription', pDescription)
    formData.append('pStatus', pStatus)
    formData.append('pCategory', pCategory)
    formData.append('pQuantity', pQuantity)
    formData.append('pPrice', pPrice)
    formData.append('pOffer', pOffer)
    
    try {
        const { data } = await api.createProduct(formData)
        
        if (data.error)
            return setFdata({ ...fData, error: data.error, success: null })

        if (data.success) {
            setFdata({ ...fData, error: null, success: data.success })
            
            setTimeout(async () => {
                setFdata({
                    pName: '',
                    pDescription: '',
                    pStatus: 'Active',
                    pImage: null,
                    pCategory: '',
                    pPrice: '',
                    pOffer: 0,
                    pQuantity: "",
                    success: null,
                    error: null
                })

                dispatch({ type: ADD_PRODUCT_MODAL, payload: false })
            
                dispatch({ type: PRODUCT_LOADING, payload: true })

                const prodRes = await api.fetchProducts()

                dispatch({ type: FETCH_PRODUCTS_AND_CHANGE_STATE, payload: prodRes.data.products })

                dispatch({ type: PRODUCT_LOADING, payload: false })
            }, 3500)
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = (pId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LOADING, payload: true })
        
        const { data } = await api.deleteProduct({ pId })
        
        if(data.success) {
            const prodRes = await api.fetchProducts()

            dispatch({ type: FETCH_PRODUCTS_AND_CHANGE_STATE, payload: prodRes.data.products })
            
            dispatch({ type: PRODUCT_LOADING, payload: false })
        }
    } catch (error) {
        console.log(error)
    }
}

export const editProduct = (fData, setFdata) => async (dispatch) => {
    const formData = new FormData()

    if (fData.pEditImages) {
        for (const file of fData.pEditImages)
            formData.append('pEditImages', file)
    }

    formData.append('pId', fData.pId)
    formData.append('pName', fData.pName)
    formData.append('pDescription', fData.pDescription)
    formData.append('pPrice', fData.pPrice)
    formData.append('pQuantity', fData.pQuantity)
    formData.append('pCategory', fData.pCategory)
    formData.append('pOffer', fData.pOffer)
    formData.append('pStatus', fData.pStatus)
    formData.append('pImages', fData.pImages)

    try {
        const { data } = await api.editProduct(formData)

        if (data.error)
            return setFdata({ ...fData, error: data.error, success: null })

        if (data.success) {
            setFdata({ ...fData, error: null, success: data.success })

            setTimeout(async () => {
                dispatch({ type: PRODUCT_LOADING, payload: true })

                const prodRes = await api.fetchProducts()

                dispatch({ type: FETCH_PRODUCTS_AND_CHANGE_STATE, payload: prodRes.data.products })

                dispatch({ type: PRODUCT_LOADING, payload: false })
            }, 3500)
        }
    } catch (error) {
        console.log(error)
    }
}