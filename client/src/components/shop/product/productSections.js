import React, { useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import { deleteProductReview, menuHandle, reviewProduct } from '../../../actions/product'
import { initCart } from '../../../actions/layout'

const apiURL = process.env.REACT_APP_API_URL

const Submenu = ({ value }) => {
    const { categoryId, product, category } = value

    const history = useHistory()

    return (
        <Fragment>
            {/* Submenu Section */}
            <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24">
                <div className="flex justify-between items-center">
                    <div className="text-sm flex space-x-2">
                        <span className="hover:text-yellow-700 cursor-pointer" onClick={() => history.push("/")}>Shop</span>
                        <span className="hover:text-yellow-700 cursor-pointer" onClick={() => history.push(`/products/category/${categoryId}`)}>{category}</span>
                        <span className="text-yellow-700 cursor-default">{product}</span>
                    </div>
                    
                    <div>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </section>
            {/* Submenu Section */}
        </Fragment>
    )
}

const Menu = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.product)

    return (
        <Fragment>
            <div className="flex flex-col md:flex-row items-center justify-center">
                <div onClick={() => dispatch(menuHandle(true))} className={`${data.menu ? "border-b-2 border-yellow-700" : ""} px-4 py-3 cursor-pointer`}>
                    Description
                </div>
                <div onClick={() => dispatch(menuHandle(false))} className={`${!data.menu ? "border-b-2 border-yellow-700" : ""} px-4 py-3 relative flex cursor-pointer`}>
                    <span>Reviews</span>
                    <span className="absolute text-xs top-0 right-0 mt-2 bg-yellow-700 text-white rounded px-1">
                        {data.product.pRatingsReviews.length}
                    </span>
                </div>
            </div>
        </Fragment>
    )
}

const AllReviews = () => {
    const [fData, setFdata] = useState({ error: null, success: null })

    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.layout.currentUser.isLoggedIn)
    const currentUser = useSelector(state => state.layout.currentUser.data)
    const data = useSelector(state => state.product)

    const { pRatingsReviews } = useSelector(state => state.product.product)

    const Alert = (color, text) => <div className={`bg-${color}-200 px-4 py-2 my-2 rounded`}>{text}</div>

    const deleteReview = (rId) => {
        const reviewData = {
            rId,
            pId: data.product._id
        }
        dispatch(deleteProductReview(reviewData, fData, setFdata))
    }

    if (fData.success) {
        setTimeout(() => {
          setFdata({ ...fData, success: false })
        }, 2000)
    }

    return (
        <Fragment>
            <div className="md:mx-16 lg:mx-20 xl:mx-24 flex flex-col">
                {fData.success && Alert("red", fData.success)}
                {fData.error && Alert("red", fData.error)}
            </div>

            <div className="mt-6 mb-12 md:mx-16 lg:mx-20 xl:mx-24">
                {/* List start */}
                {pRatingsReviews.length > 0 ? pRatingsReviews.map((item, index) => (
                    <Fragment key={index}>
                        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-start">
                            <img className="mx-2 w-16 h-16 rounded-full" src="https://secure.gravatar.com/avatar/676d90a1574e9d3ebf98dd36f7adad60?s=60&d=mm&r=g" alt="pic"/>
                            <div className="mx-2 flex justify-between w-full">
                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <span>{item.user?.name || ""}</span>
                                        <span className="text-sm text-yellow-700">{moment(item.createdAt).format("lll")}</span>
                                    </div>
                                    <div className="leading-tight mt-3">{item.review}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex">
                                        {/* Yellow Star */}
                                        {[...Array(Number(item.rating))].map((index) => (
                                            <span key={Math.random()}>
                                                <svg className="w-4 h-4 fill-current text-yellow-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </span>
                                        ))}
                                        {/* White Star */}
                                        {[...Array(5 - Number(item.rating))].map(() => (
                                            <span key={Math.random()}>
                                                <svg className="w-4 h-4 fill-current text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </span>
                                        ))}
                                    </div>
                                    {isAuth && item.user?._id === currentUser.id && (
                                        <div className="flex justify-center my-2">
                                            <span onClick={() => deleteReview(item._id)} className="hover:bg-gray-300 p-2 rounded-full cursor-pointer">
                                                <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ))
                : <div>No Review found</div>}
            </div>
        </Fragment>
    )
}

const ReviewForm = () => {
    const [fData, setFdata] = useState({ rating: '', review: '', error: null, success: null })

    const dispatch = useDispatch()
    const data = useSelector(state => state.product)
    const currentUser = useSelector(state => state.layout.currentUser.data)
    const ratingUserList = data.product.pRatingsReviews?.map(review => review.user?._id)

    const Alert = (color, text) => <div className={`bg-${color}-200 px-4 py-2 my-2 rounded`}>{text}</div>

    const reviewSubmitHanlder = () => {
        const reviewData = {
            pId: data.product._id,
            uId: currentUser.id,
            rating: fData.rating,
            review: fData.review
        }

        dispatch(reviewProduct(reviewData, fData, setFdata))
    }

    if (fData.success) setTimeout(() => { setFdata({ ...fData, success: null }) }, 3000)

    return (
        <Fragment>
            <div className="md:mx-16 lg:mx-20 xl:mx-24 flex flex-col">
                {fData.error && Alert("red", fData.error)}
                {fData.success && Alert("green", fData.success)}
            </div>

            {ratingUserList.includes(currentUser.id) 
                ? <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24"></div>
                : (
                <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24 flex flex-col">
                    <div className="flex flex-col space-y-2">
                        <span className="text-2xl font-medium">Add a review</span>
                        <span className="text-gray-600 text-sm">Your email address will not be published. Required fields are marked *</span>
                    </div>
                    {/* Input Rating */}
                    <div className="mb-4">
                        <fieldset onChange={(e) => setFdata({ ...fData, rating: e.target.value })} className="rating">
                            <input
                                type="radio"
                                className="rating"
                                id="star5"
                                name="rating"
                                defaultValue={5}
                            />
                            <label
                                className="full"
                                htmlFor="star5"
                                title="Awesome - 5 stars"
                            />
                            <input
                                type="radio"
                                className="rating"
                                id="star4"
                                name="rating"
                                defaultValue={4}
                            />
                            <label
                                className="full"
                                htmlFor="star4"
                                title="Pretty good - 4 stars"
                            />
                            <input
                                type="radio"
                                className="rating"
                                id="star3"
                                name="rating"
                                defaultValue={3}
                            />
                            <label
                                className="full"
                                htmlFor="star3"
                                title="Meh - 3 stars"
                            />
                            <input
                                type="radio"
                                className="rating"
                                id="star2"
                                name="rating"
                                defaultValue={2}
                            />
                            <label
                                className="full"
                                htmlFor="star2"
                                title="Kinda bad - 2 stars"
                            />
                            <input
                                type="radio"
                                className="rating"
                                id="star1"
                                name="rating"
                                defaultValue={1}
                            />
                            <label
                                className="full"
                                htmlFor="star1"
                                title="Sucks big time - 1 star"
                            />
                        </fieldset>
                    </div>
                    {/* Review Form */}
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="textArea">Review <span className="text-sm text-gray-600">*</span></label>
                            <textarea
                                onChange={(e) => setFdata({ ...fData, review: e.target.value })}
                                value={fData.review}
                                className="border px-4 py-2 focus:outline-none"
                                name="textArea"
                                id="textArea"
                                cols={30}
                                rows={3}
                                placeholder="Your review..."
                            />
                        </div>
                        <div
                            onClick={reviewSubmitHanlder}
                            style={{ background: "#303031" }}
                            className="inline-block rounded px-4 py-2 text-white text-center cursor-pointer"
                        >
                            Submit
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

const RatingReview = () => {
    const isAuth = useSelector(state => state.layout.currentUser.isLoggedIn)

    return (
        <Fragment>
            <AllReviews />
            {
                isAuth
                ? <ReviewForm />
                : <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24 bg-red-200 px-4 py-2 rounded mb-4">You need to login in for review</div>
            }
        </Fragment>
    )
}

const FirstSection = () => {
    const [count, setCount] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [wList, setWlist] = useState(JSON.parse(localStorage.getItem('wishList')) || [])
    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('cart')) || [])

    const dispatch = useDispatch()
    const data = useSelector(state => state.product)
    const layoutData = useSelector(state => state.layout)

    const product = data.product
    const dataInCart = layoutData.inCart?.includes(product._id) ? cartProducts?.filter(prod => prod.id === product._id)[0] : null

    const slideImage = (type) => {
        switch (type) {
            case 'right':
                if (count === 1)
                    return setCount(0)
                return setCount(1)

            case 'left':
                if (count === 0)
                    return setCount(1)
                return setCount(0)
            default:
                return
        }
    }
    const isWish = (id, wList) => {
        return wList.includes(id)
    }
    const wishReq = (id, setWlist) => {
        let wList = JSON.parse(localStorage.getItem('wishList')) || []

        if (wList.includes(id))
            return

        wList.push(id)

        localStorage.setItem('wishList', JSON.stringify(wList))

        setWlist(wList)
    }
    const unWishReq = (id, setWlist) => {
        let wList = JSON.parse(localStorage.getItem('wishList')) || []

        if (!wList.includes(id))
            return

        wList = wList.filter(ids => ids !== id)

        localStorage.setItem('wishList', JSON.stringify(wList))

        setWlist(wList)
    }
    const updateQuantity = (type, inCart = false) => {
        switch (type) {
            case 'increase':
                if (inCart) {
                    if (dataInCart.quantity === product.pQuantity) break
                    const newCart = cartProducts.map(prod => 
                                                            prod.id !== product._id 
                                                            ? prod 
                                                            : { id: product._id, price: product.pPrice, quantity: prod.quantity + 1 })
                    localStorage.setItem('cart', JSON.stringify(newCart))
                    setCartProducts(newCart)
                    setQuantity(dataInCart.quantity + 1)
                    dispatch(initCart())
                    break
                }
                if (quantity === product.pQuantity) break
                setQuantity(quantity + 1)
                break
            
            case 'decrease':
                if (inCart) {
                    const newCart = cartProducts.map(prod => 
                                                            prod.id !== product._id 
                                                            ? prod
                                                            : { id: product._id, price: product.pPrice, quantity: prod.quantity > 1 ? prod.quantity - 1 : 1 })
                    localStorage.setItem('cart', JSON.stringify(newCart))
                    setCartProducts(newCart)
                    setQuantity(dataInCart.quantity - 1)
                    dispatch(initCart())
                    break
                }
                setQuantity(quantity > 1 ? quantity - 1 : 1)
                break

            default:
                break
        }
    }
    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || []

        const newProd = { id: product._id, price: product.pPrice, quantity }

        cart.push(newProd)

        localStorage.setItem('cart', JSON.stringify(cart))
        
        setCartProducts(cart)

        dispatch(initCart())
    }

    return (
        <Fragment>
            <Submenu
                value={{
                    categoryId: product.pCategory._id,
                    product: product.pName,
                    category: product.pCategory.cName,
                }}
            />

            <section className="m-4 md:mx-12 md:my-6">
                <div className="grid grid-cols-2 md:grid-cols-12">
                    <div className="hidden md:block md:col-span-1 md:flex md:flex-col md:space-y-4 md:mr-2">
                        <img onClick={() => setCount(0)} className={`${count === 0 ? "" : "opacity-25"} cursor-pointer w-20 h-20 object-cover object-center`} src={`${apiURL}/uploads/products/${product.pImages[0]}`}alt="pic" />
                        <img onClick={() => setCount(1)} className={`${count === 1 ? "" : "opacity-25"} cursor-pointer w-20 h-20 object-cover object-center`} src={`${apiURL}/uploads/products/${product.pImages[1]}`} alt="pic"/>
                    </div>

                    <div className="col-span-2 md:col-span-7">
                        <div className="relative">
                            <img className="w-full" src={`${apiURL}/uploads/products/${product.pImages[count]}`} alt="Pic" />
                            <div className="absolute inset-0 flex justify-between items-center mb-4">
                                <svg onClick={() => slideImage('left')} className="flex justify-center  w-12 h-12 text-gray-700 opacity-25 cursor-pointer hover:text-yellow-700 hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <svg onClick={() => slideImage('right')} className="flex justify-center  w-12 h-12 text-gray-700 opacity-25 cursor-pointer hover:text-yellow-700 hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 mt-8 md:mt-0 md:col-span-4 md:ml-6 lg:ml-12">
                        <div className="flex flex-col leading-8">
                            <div className="text-2xl tracking-wider">{product.pName}</div>
                            <div className="flex justify-between items-center">
                                <span className="text-xl tracking-wider text-yellow-700">${product.pPrice}.00</span>
                                <span>
                                    <svg onClick={() => wishReq(product._id, setWlist)} className={`${isWish(product._id, wList) && "hidden"} w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <svg onClick={() => unWishReq(product._id, setWlist)} className={`${!isWish(product._id, wList) && "hidden"} w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="my-4 md:my-6 text-gray-600">{product.pDescription}</div>

                        <div className="my-4 md:my-6">
                            {quantity === product.pQuantity && <span className="text-xs text-red-500">Stock limited</span>}
                            <div className={`flex justify-between items-center px-4 py-2 border ${quantity === product.pQuantity && "border-red-500"}`}>
                                <div className={`${quantity === product.pQuantity && "text-red-500"}`}>Quantity</div>
                                {/* Quantity Button */}
                                {
                                    product.pQuantity ? (
                                        <Fragment>
                                            <div className="flex items-center space-x-2">
                                                <span onClick={dataInCart ? () => updateQuantity('decrease', true) : () => updateQuantity('decrease')}>
                                                    <svg className="w-5 h-5 fill-current cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </span>

                                                <span className="font-semibold">{dataInCart?.quantity || quantity}</span>

                                                <span onClick={dataInCart ? () => updateQuantity('increase', true) : () => updateQuantity('increase')}>
                                                    <svg className="w-5 h-5 fill-current cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <span>
                                                <svg className="w-5 h-5 fill-current cursor-not-allowed" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>

                                            <span className="font-semibold">{quantity}</span>
                                            
                                            <span>
                                                <svg className="w-5 h-5 fill-current cursor-not-allowed" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </div>
                                    )
                                }
                                {/* Quantity Button End */}
                            </div>

                            {/* Incart and out of stock button */}
                            {product.pQuantity ? (
                                <Fragment>
                                {
                                    layoutData.inCart && layoutData.inCart.includes(product._id) ? (
                                        <div style={{ background: "#303031" }} className={`px-4 py-2 text-white text-center cursor-not-allowed uppercase opacity-75`}>In cart</div>
                                    ) : (
                                        <div onClick={addToCart} style={{ background: "#303031" }} className={`px-4 py-2 text-white text-center cursor-pointer uppercase`}>Add to cart</div>
                                    )
                                }
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {layoutData.inCart && layoutData.inCart.includes(product._id) ? (
                                        <div style={{ background: "#303031" }} className={`px-4 py-2 text-white text-center cursor-not-allowed uppercase opacity-75`}>In cart</div>
                                    ) : (
                                        <div style={{ background: "#303031" }} disabled={true} className="px-4 py-2 text-white opacity-50 cursor-not-allowed text-center uppercase">Out of stock</div>
                                    )}
                                </Fragment>
                            )}
                            {/* Incart and out of stock button End */}
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

const SecondSection = () => {
    const data = useSelector(state => state.product)

    return (
        <Fragment>
            <section className="m-4 md:mx-12 md:my-8">
                <Menu />
                {data.menu ? <div className="mt-6">{data.product.pDescription}</div> : <RatingReview />}
            </section>

            <div className="m-4 md:mx-8 md:my-6 flex justify-center capitalize font-light tracking-widest bg-white border-t border-b text-gray-800 px-4 py-4 space-x-4">
                <div>
                    <span>Category :</span>
                    <span className="text-sm text-gray-600">
                        {data.product?.pCategory?.cName || ""}
                    </span>
                </div>
            </div>
        </Fragment>
    )
}

export { FirstSection, SecondSection }