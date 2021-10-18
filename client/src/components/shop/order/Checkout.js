import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Layout from '../layout'
import { placeOrder } from '../../../actions/order'

const apiURL = process.env.REACT_APP_API_URL

const CheckoutComponent = () => {
    const history = useHistory()
    const data = useSelector(state => state.layout)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        fullname: "",
        address: "",
        city: "",
        phone: "",
        error: null,
        success: null
    })

    const inputChange = (e) => setState({ ...state, error: null, [e.target.name]: e.target.value })

    const order = () => {
        const user = data.currentUser.data?.id

        const allProduct = data.cartProduct?.map(product => ({
            id: product._id,
            price: product.pPrice,
            quantity: product.qtyInCart
        }))

        dispatch(placeOrder(state, setState, allProduct, user, history))
    }

    if (data.loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <svg className="w-12 h-12 animate-spin text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Please wait until the process finish
            </div>
        )
    }

    return (
        <Fragment>
            <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
                <div className="text-2xl mx-2">Order</div>
                {/* Product List */}
                <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
                    <div className="md:w-1/2">
                        <CheckoutProducts products={data.cartProduct} total={data.cartTotal} />
                    </div>

                    <div className="w-full order-first md:order-last md:w-1/2">
                        <Fragment>
                            <div onBlur={() => setState({ ...state, error: false })} className="p-4 md:p-8">
                                { state.error && <div className="bg-red-200 py-2 px-4 rounded">{state.error}</div> }
                                { state.success && <div className="bg-green-200 py-2 px-4 rounded">{state.success}</div> }

                                <div className="flex flex-col py-2">
                                    <label htmlFor="fullname" className="pb-2">Full Name</label>
                                    <input
                                        value={state.fullname}
                                        onChange={inputChange}
                                        name="fullname"
                                        type="text"
                                        id="fullname"
                                        className="border px-4 py-2"
                                        placeholder="Full Name..."
                                    />
                                </div>

                                <div className="flex flex-col py-2">
                                    <label htmlFor="address" className="pb-2">Delivery Address</label>
                                    <input
                                        value={state.address}
                                        onChange={inputChange}
                                        name="address"
                                        type="text"
                                        id="address"
                                        className="border px-4 py-2"
                                        placeholder="Address..."
                                    />
                                </div>

                                <div className="flex flex-col py-2">
                                    <label htmlFor="city" className="pb-2">City</label>
                                    <input
                                        value={state.city}
                                        onChange={inputChange}
                                        name="city"
                                        type="text"
                                        id="city"
                                        className="border px-4 py-2"
                                        placeholder="City..."
                                    />
                                </div>

                                <div className="flex flex-col py-2 mb-2">
                                    <label htmlFor="phone" className="pb-2">Phone</label>
                                    <input
                                        value={state.phone}
                                        onChange={inputChange}
                                        name="phone"
                                        type="number"
                                        id="phone"
                                        className="border px-4 py-2"
                                        placeholder="+212"
                                    />
                                </div>

                                <div onClick={order} className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer" style={{ background: "#303031" }}>
                                    Order now
                                </div>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

const CheckoutProducts = ({ products, total }) => {
    const history = useHistory()

    return (
        <Fragment>
            <div className="grid grid-cols-2 md:grid-cols-1">
                {products && products.length
                ? products.map((product, index) => (
                    <div key={index} className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between">
                        <div className="md:flex md:items-center md:space-x-4">
                            <img
                                onClick={() => history.push(`/products/${product._id}`)}
                                className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                                src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                                alt="wishListproduct"
                            />

                            <div className="text-lg md:ml-6 truncate">{product.pName}</div>

                            <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                                Price : ${product.pPrice}.00
                            </div>

                            <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                                Quantity : {product.qtyInCart}
                            </div>

                            <div className="font-semibold text-gray-600 text-sm">
                                Subtotal : ${product.qtyInCart * product.pPrice}.00
                            </div>
                        </div>
                    </div>
                ))
                : <div>No product found for checkout</div>}

                {total && (
                    <div className='flex justify-end my-3 font-semibold'>
                        <span className='mx-3'>Total:</span>
                        <span>${ total }.00</span>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

const Checkout = () => {
    return (
        <Layout>
            <CheckoutComponent />
        </Layout>
    )
}

export default Checkout