import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { authError, authModalOpen, cartModalOpen, initCart } from '../../../actions/layout'

const apiURL = process.env.REACT_APP_API_URL

const CartModal = () => {
    const data = useSelector(state => state.layout)
    const dispatch = useDispatch()

    const isUser = data.currentUser.isLoggedIn
    const products = data.cartProduct

    const history = useHistory()

    const removeCartProduct = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        if (!cart)
            return

        const newCart = cart.filter(product => product.id !== id)

        newCart.length
            ? localStorage.setItem('cart', JSON.stringify(newCart))
            : localStorage.removeItem('cart')

        dispatch(initCart())
    }
    const closeCart = () => {
        dispatch(cartModalOpen(!data.cartModal))
    }
    const continueShopping = () => {
        dispatch(cartModalOpen(!data.cartModal))
        history.push('/')
    }
    const goCheckout = () => {
        dispatch(cartModalOpen(!data.cartModal))
        history.push('/checkout')
    }
    const loginFirst = () => {
        dispatch(cartModalOpen(!data.cartModal))

        dispatch(authError(!data.authError))

        dispatch(authModalOpen(!data.authModal))

        history.push('/')
    }

    useEffect(() => {
        dispatch(initCart())
    }, [dispatch])

    return (
        <Fragment>
            {/* Black Overlay */}
            <div className={`${!data.cartModal ? "hidden" : ""} fixed top-0 z-30 w-full h-full bg-black opacity-50`} />
            {/* Cart Modal Start */}
            <section className={`${!data.cartModal ? "hidden" : ""} fixed z-40 inset-0 flex items-start justify-end`}>
                <div style={{ background: "#303031" }} className="w-full md:w-5/12 lg:w-4/12 h-full flex flex-col justify-between">
                    <div className="overflow-y-auto">
                        <div className="border-b border-gray-700 flex justify-between">
                            <div className="p-4 text-white text-lg font-semibold">Cart</div>
                            {/* Cart Modal Close Button */}
                            <div className="p-4 text-white">
                                <svg onClick={closeCart} className="w-6 h-6 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div className="m-4 flex-col">
                        {products && products.length && products.map((item, index) => (
                            <Fragment key={index}>
                                {/* CART PRODUCT START */}
                                <div className="text-white flex space-x-2 my-4 items-center">
                                    <img className="w-16 h-16 object-cover object-center" src={`${apiURL}/uploads/products/${item.pImages[0]}`} alt="cartProduct" />
                                    <div className="relative w-full flex flex-col">
                                        <div className="my-2">{item.pName}</div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center justify-between space-x-2">
                                                <div className="text-sm text-gray-400">Quantity :</div>
                                                <div className="flex items-end">
                                                    <span className="text-sm text-gray-200">{item.qtyInCart}</span>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <span className="text-sm text-gray-400" style={{ marginRight: '.5rem' }}>Subtotal :</span>
                                                ${item.pPrice * item.qtyInCart}.00
                                            </div>
                                            {/* SUbtotal Count */}
                                        </div>

                                        {/* Cart Product Remove Button */}
                                        <div onClick={() => removeCartProduct(item._id)} className="absolute top-0 right-0 text-white" >
                                            <svg className="w-5 h-5 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                {/* CART PRODUCT END */}
                            </Fragment>
                        ))}

                        {products === null && <div className="m-4 flex-col text-white text-xl text-center">No product in cart</div>}
                        </div>
                    </div>

                    <div className="m-4 space-y-4">
                        <div onClick={continueShopping} className="cursor-pointer px-4 py-2 border border-gray-400 text-white text-center cursor-pointer">Continue shopping</div>
                        {
                            data.cartTotal
                            ? ( <Fragment>
                                {
                                    isUser
                                    ? <div className="px-4 py-2 bg-black text-white text-center cursor-pointer" onClick={goCheckout}>Checkout ${data.cartTotal}.00</div>
                                    : <div onClick={loginFirst} className="px-4 py-2 bg-black text-white text-center cursor-pointer">Checkout ${data.cartTotal}.00</div>
                                }
                                </Fragment>)
                            : <div className="px-4 py-2 bg-black text-white text-center cursor-not-allowed">Checkout</div>
                        }
                    </div>
                </div>
            </section>
            {/* Cart Modal End */}
        </Fragment>
    )
}

export default CartModal
// THE SOURCE ATTRIBUTE FOR CART IMAGES => src={`${apiURL}/uploads/products/${item.pImage 