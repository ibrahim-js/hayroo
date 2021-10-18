import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ProductMenu from './ProductMenu'
import ProductTable from './ProductTable'
import AdminLayout from '../layout'

import { fetchProducts } from '../../../actions/product'

const Products = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <Fragment>
            <AdminLayout>
                <div className="grid grid-cols-1 space-y-4 p-4">
                    <ProductMenu />
                    <ProductTable />
                </div>
            </AdminLayout>
        </Fragment>
            
    )
}

export default Products
