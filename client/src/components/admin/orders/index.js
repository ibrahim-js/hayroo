import React from 'react'

import OrderMenu from './OrderMenu'
import AllOrders from './AllOrders'
import Layout from '../layout'

const Orders = () => {
    return (
        <Layout>
            <div className="grid grid-cols-1 space-y-4 p-4">
                <OrderMenu />
                <AllOrders />
            </div>
        </Layout>
    )
}

export default Orders
