import * as api from '../api'
import { IMAGE_UPLOAD, LOADING, UPLOAD_IMAGE, TOTAL_DATA, DELETE_IMAGE, SLIDER_IMAGES } from '../constants/dashboard'
import { FETCH_ORDER_AND_CHANGE_STATE, FILTER_ORDERS } from '../constants/orders'

export const initDashboard = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING, payload: true })

        const { data } = await api.dashboardData()
        
        dispatch({ type: TOTAL_DATA, payload: data })

        const sliderRes = await api.fetchSlider()

        dispatch({ type: SLIDER_IMAGES, payload: sliderRes.data.images })

        const ordersRes = await api.fetchOrders()

        dispatch({ type: FETCH_ORDER_AND_CHANGE_STATE, payload: ordersRes.data.orders })
        dispatch({ type: FILTER_ORDERS, payload: ordersRes.data.orders })

        dispatch({ type: LOADING, payload: false })
    } catch (error) {
        console.log(error)
    }
}

export const uploadImage = (image) => async (dispatch) => {
    dispatch({ type: IMAGE_UPLOAD, payload: true })

    let formData = new FormData()

    formData.append('image', image)
    
    try {
        const { data } = await api.uploadImage(formData)

        if (data.success) {
            dispatch({ type: UPLOAD_IMAGE, payload: data.customize })
            
            dispatch({ type: IMAGE_UPLOAD, payload: false })
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteImage = (id) => async (dispatch) => {
    dispatch({ type: IMAGE_UPLOAD, payload: true })

    try {
        const { data } = await api.deleteImage(id)

        if (data.success) {
            dispatch({ type: DELETE_IMAGE, payload: id })

            dispatch({ type: IMAGE_UPLOAD, payload: false })
        }
    } catch (error) {
        console.log(error)
    }
}