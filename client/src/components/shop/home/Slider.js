import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import OrderSuccessMessage from './OrderSuccessMessage'
import { fetchSlider } from '../../../actions/home'

const apiURL = process.env.REACT_APP_API_URL

const Slider = () => {
    const [slide, setSlide] = useState(0)

    const dispatch = useDispatch()
    const data = useSelector(state => state.home)

    const prevSlide = () => {
        if (slide === 0)
            return setSlide(data.sliderImages?.length - 1)

        setSlide(slide - 1)
    }
    const nextSlide = () => {
        if (slide === data.sliderImages?.length - 1) 
            return setSlide(0)

        setSlide(slide + 1)
    }

    useEffect(() => {
        dispatch(fetchSlider())
    }, [dispatch])

    return (
        <Fragment>
            <div className="relative mt-16 bg-gray-100 border-2">
                {
                    data.sliderImages.length
                    && <img className="w-full" src={`${apiURL}/uploads/customize/${data.sliderImages[slide].slideImage}`} alt="sliderImage" />
                }
                <svg onClick={prevSlide} className={`z-10 absolute top-0 left-0 mt-64 flex justify-end items-center box-border flex justify-center w-12 h-12 text-gray-700  cursor-pointer hover:text-yellow-700`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <svg onClick={nextSlide} className={`z-10 absolute top-0 right-0 mt-64 flex justify-start items-center box-border flex justify-center w-12 h-12 text-gray-700 cursor-pointer hover:text-yellow-700`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <a href="#shop" style={{ background: "#303031" }} className="cursor-pointer box-border text-2xl text-white px-4 py-2 rounded">Shop Now</a>
                </div>
            </div>
            <OrderSuccessMessage />
        </Fragment>
    )
}

export default Slider
