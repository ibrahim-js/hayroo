import React, { Fragment } from 'react'

import AdminLayout from '../layout'
import CategoryMenu from './CategoryMenu'
import AllCategories from './AllCategories'

const Categories = () => {
    return (
        <Fragment>
            <AdminLayout>
            <div className="grid grid-cols-1 space-y-4 p-4">
                <CategoryMenu />
                <AllCategories />
            </div>
            </AdminLayout>
        </Fragment>
    )
}

export default Categories
