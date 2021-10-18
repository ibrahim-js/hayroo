import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Layout from '../layout'
import Slider from './Slider'
import ProductCategory from './ProductCategory'
import SingleProduct from './SingleProduct'

import { fetchProducts } from '../../../actions/home'

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <Layout>
            <Slider />
            <section className="m-4 md:mx-8 md:my-6">
                <ProductCategory />
            </section>

            <section className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <SingleProduct />
            </section>
        </Layout>
    )
}

export default Home
