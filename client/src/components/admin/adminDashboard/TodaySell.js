import moment from 'moment'
import React, { Fragment }  from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const apiURL = process.env.REACT_APP_API_URL

const SellTable = () => {
    const orderData = useSelector(state => state.order)
    const history = useHistory()

    
    const grabTodaysOrders = () => orderData.orders?.filter(order => moment(order.createdAt).format('LL') === moment().format('LL'))

    return (
        <Fragment>
            <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
                <div className="text-2xl font-semibold mb-6 text-center">
                    Today's Orders{" "}
                    {orderData.orders ? grabTodaysOrders().length : 0}
                </div>

                <table className="table-auto border w-full my-2">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Products</th>
                            <th className="px-4 py-2 border">Image</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Order Address</th>
                            <th className="px-4 py-2 border">Ordered at</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orderData.orders 
                            ? grabTodaysOrders().map((item, key) => <TodayOrderTable order={item} key={key} />)
                            : (
                                <tr>
                                    <td colSpan="5" className="text-xl text-center font-semibold py-8">
                                        No orders found today
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>

                <div className="text-sm text-gray-600 mt-2">
                    Total{" "}
                    {orderData.orders ? grabTodaysOrders().length : 0}{" "}
                    orders found
                </div>

                <div className="flex justify-center">
                    <span
                        onClick={() => history.push("/admin/dashboard/orders")}
                        style={{ background: "#303031" }}
                        className="cursor-pointer px-4 py-2 text-white rounded-full"
                    >
                        View All
                    </span>
                </div>
            </div>
        </Fragment>
    )
}

const TodayOrderTable = ({ order }) => {
    return (
        <Fragment>
            <tr>
                <td className="w-48 hover:bg-gray-200 p-2 flex flex-col space-y-1">
                    {order.allProduct.map((item, index) => {
                        return (
                            <div key={index} className="flex space-x-2">
                                <span>{item.id.pName}</span>
                                <span>{item.quantity}x</span>
                            </div>
                        )
                    })}
                </td>

                <td className="p-2 text-left">
                    {order.allProduct.map((item, index) => {
                        return (
                            <img
                                key={index}
                                className="w-12 h-12 object-cover"
                                src={`${apiURL}/uploads/products/${item.id.pImages[0]}`}
                                alt="Pic"
                            />
                        )
                    })}
                </td>

                <td className="p-2 text-center">
                    {order.status === "Not processed" && (
                        <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
                            {order.status}
                        </span>
                    )}
                    {order.status === "Processing" && (
                        <span className="block text-yellow-600 rounded-full text-center text-xs px-2 font-semibold">
                            {order.status}
                        </span>
                    )}
                    {order.status === "Shipped" && (
                        <span className="block text-blue-600 rounded-full text-center text-xs px-2 font-semibold">
                            {order.status}
                        </span>
                    )}
                    {order.status === "Delivered" && (
                        <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
                            {order.status}
                        </span>
                    )}
                    {order.status === "Cancelled" && (
                        <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
                            {order.status}
                        </span>
                    )}
                </td>

                <td className="p-2 text-center">{order.address}</td>

                <td className="p-2 text-center">{moment(order.createdAt).format("lll")}</td>
            </tr>
        </Fragment>
    )
}

const TodaySell = () => {
    return (
        <div className="m-4">
            <SellTable />
        </div>
    )
}

export default TodaySell
