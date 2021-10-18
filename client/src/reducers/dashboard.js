import { DELETE_IMAGE, IMAGE_UPLOAD, LOADING, SLIDER_IMAGES, TOTAL_DATA, TOTAL_ORDERS, UPLOAD_SLIDER_BTN, UPLOAD_IMAGE } from "../constants/dashboard"

const initState = {
    loading: false,
    totalData: [],
    totalOrders: null,
    uploadSliderBtn: true,
    imageUpload: false,
    sliderImages: []
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case TOTAL_DATA:
            return {
                ...state,
                totalData: action.payload
            }

        case TOTAL_ORDERS:
            return {
                ...state,
                totalOrders: action.payload
            }

        case UPLOAD_SLIDER_BTN:
            return {
                ...state,
                uploadSliderBtn: action.payload
            }

        case IMAGE_UPLOAD:
            return {
                ...state,
                imageUpload: action.payload
            }

        case SLIDER_IMAGES:
            return {
                ...state,
                sliderImages: action.payload
            }

        case DELETE_IMAGE:
            return {
                ...state,
                sliderImages: state.sliderImages.filter(image => image._id !== action.payload)
            }

        case UPLOAD_IMAGE:
            return {
                ...state,
                sliderImages: [...state.sliderImages, action.payload]
            }

        default:
            return state
    }
}

export default reducer