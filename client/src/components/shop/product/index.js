import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Layout from '../layout'
import { FirstSection, SecondSection } from './productSections'
import { initProduct } from '../../../actions/product'

import './style.css'

const Details = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const data = useSelector(state => state.product)

    useEffect(() => {
        dispatch(initProduct(id))
    }, [dispatch, id])

    if (data.loading) {
        return (
            <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center h-screen">
                <svg className="w-12 h-12 animate-spin text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
            </div>
        )
    }

    if (!data.product) {
        return (
            <div className=''>No product found with that ID</div>
        )
    }

    return (
        <Fragment>
            <FirstSection />
            <SecondSection />
        </Fragment>
    )
}

const ProductDetails = () => {
    return (
        <Layout>
            <Details />
        </Layout>
    )
}

export default ProductDetails
