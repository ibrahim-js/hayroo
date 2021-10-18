import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createProduct } from '../../../actions/product'
import { ADD_PRODUCT_MODAL } from '../../../constants/product'

const AddProduct = ({ categories }) => {
    const data = useSelector(state => state.product)
    const dispatch = useDispatch()

    const [fData, setFdata] = useState({
        pName: '',
        pDescription: '',
        pStatus: 'Active',
        pImage: null,
        pCategory: '',
        pPrice: '',
        pOffer: 0,
        pQuantity: "",
        success: null,
        error: null
    })

    const alert = (msg, type) => <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
    const inputChange = (e) => {
        setFdata({ ...fData, error: null, success: null, [e.target.name]: e.target.value })
    }
    const submitForm = (e) => {
        e.preventDefault()
        e.target.reset()

        if (!fData.pImage || fData.pImage?.length !== 2)
            return setFdata({ ...fData, error: 'Must select 2 images exactly' })

        dispatch(createProduct(fData, setFdata))
    }

    return (
        <Fragment>
            {/* Black Overlay */}
            <div
                onClick={() => dispatch({ type: ADD_PRODUCT_MODAL, payload: false })}
                className={`${data.addProductModal ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
            />
            {/* End Black Overlay */}

            {/* Modal Start */}
            <div className={`${data.addProductModal ? "" : "hidden"} fixed inset-0 flex items-center z-30 justify-center overflow-auto`}>
                <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
                    <div className="flex items-center justify-between w-full pt-4">
                        <span className="text-left font-semibold text-2xl tracking-wider">
                            Add Product
                        </span>
                        {/* Close Modal */}
                        <span
                            style={{ background: "#303031" }}
                            onClick={() => dispatch({ type: ADD_PRODUCT_MODAL, payload: false })}
                            className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </span>
                    </div>

                    {fData.error && alert(fData.error, "red")}
                    {fData.success && alert(fData.success, "green")}

                    <form className="w-full" onSubmit={submitForm}>
                        <div className="flex space-x-1 py-4">
                            <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                                <label htmlFor="name">Product Name *</label>
                                <input
                                    value={fData.pName}
                                    onChange={inputChange}
                                    name="pName"
                                    className="px-4 py-2 border focus:outline-none"
                                    type="text"
                                />
                            </div>

                            <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                                <label htmlFor="price">Product Price *</label>
                                <input
                                    value={fData.pPrice}
                                    onChange={inputChange}
                                    name="pPrice"
                                    type="number"
                                    className="px-4 py-2 border focus:outline-none"
                                    id="price"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="description">Product Description *</label>
                            <textarea
                                value={fData.pDescription}
                                onChange={inputChange}
                                name="pDescription"
                                className="px-4 py-2 border focus:outline-none"
                                id="description"
                                cols={5}
                                rows={2}
                            />
                        </div>

                        {/* Most Important part for uploading multiple image */}
                        <div className="flex flex-col mt-4">
                            <label htmlFor="image">Product Images *</label>
                            <span className="text-gray-600 text-xs">Must provide exactly 2 images</span>
                            <input
                                onChange={(e) =>
                                    setFdata({
                                        ...fData,
                                        error: false,
                                        success: false,
                                        pImage: [...e.target.files]
                                    })
                                }
                                name="images"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                className="px-4 py-2 border focus:outline-none"
                                id="image"
                                multiple
                            />
                        </div>
                        {/* Most Important part for uploading multiple image */}

                        <div className="flex space-x-1 py-4">
                            <div className="w-1/2 flex flex-col space-y-1">
                                <label htmlFor="status">Product Status *</label>
                                <select
                                    value={fData.pStatus}
                                    onChange={(e) =>
                                        setFdata({
                                            ...fData,
                                            error: false,
                                            success: false,
                                            pStatus: e.target.value
                                        })
                                    }
                                    name="status"
                                    className="px-4 py-2 border focus:outline-none"
                                    id="status"
                                >
                                    <option name="status" value="Active">Active</option>
                                    <option name="status" value="Disabled">Disabled</option>
                                </select>
                            </div>

                            <div className="w-1/2 flex flex-col space-y-1">
                                <label htmlFor="status">Product Category *</label>
                                <select
                                    value={fData.pCategory}
                                    onChange={(e) =>
                                        setFdata({
                                            ...fData,
                                            error: false,
                                            success: false,
                                            pCategory: e.target.value
                                        })
                                    }
                                    name="status"
                                    className="px-4 py-2 border focus:outline-none"
                                    id="status"
                                >
                                    <option disabled value="">Select a category</option>
                                    {categories.length && categories.map((elem) => (
                                        <option name="status" value={elem._id} key={elem._id}>
                                            {elem.cName}
                                        </option>
                                    ))}     
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-1 py-4">
                            <div className="w-1/2 flex flex-col space-y-1">
                                <label htmlFor="quantity">Product in Stock *</label>
                                <input
                                    value={fData.pQuantity}
                                    onChange={inputChange}
                                    name="pQuantity"
                                    type="number"
                                    className="px-4 py-2 border focus:outline-none"
                                    id="quantity"
                                />
                            </div>

                            <div className="w-1/2 flex flex-col space-y-1">
                                <label htmlFor="offer">Product Offer (%) *</label>
                                <input
                                    value={fData.pOffer}
                                    onChange={inputChange}
                                    name="pOffer"
                                    type="number"
                                    className="px-4 py-2 border focus:outline-none"
                                    id="offer"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
                            <button style={{ background: "#303031" }} type="submit" className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2">
                                Create product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

const AddProductModal = ({ categories }) => {
    return (
        <Fragment>
            <AddProduct categories={categories} />
        </Fragment>
    )
}

export default AddProductModal
