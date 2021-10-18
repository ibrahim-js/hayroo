import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { editCategory } from '../../../actions/category'
import { EDIT_CATEGORY_MODAL_CLOSE } from '../../../constants/category'

const EditCategory = () => {
    const data = useSelector(state => state.category)
    const dispatch = useDispatch()
    
    const [des, setDes] = useState("")
    const [status, setStatus] = useState("")
    const [cId, setCid] = useState("")

    useEffect(() => {
        setDes(data.editCategoryModal.des)
        setStatus(data.editCategoryModal.status)
        setCid(data.editCategoryModal.cId)
    // eslint-disable-next-line
    }, [data.editCategoryModal.modal])

    const submitForm = () => {
        dispatch(editCategory(cId, des, status))
    }

    return (
        <Fragment>
            {/* Black Overlay */}
            <div
                onClick={() => dispatch({ type: EDIT_CATEGORY_MODAL_CLOSE })}
                className={`${data.editCategoryModal.modal ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
            />
            {/* End Black Overlay */}

            {/* Modal Start */}
            <div className={`${data.editCategoryModal.modal ? "" : "hidden"} fixed inset-0 m-4  flex items-center z-30 justify-center`}>
                <div className="relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4  overflow-y-auto px-4 py-4 md:px-8">
                    <div className="flex items-center justify-between w-full pt-4">
                        <span className="text-left font-semibold text-2xl tracking-wider">Add Category</span>
                        {/* Close Modal */}
                        <span
                            style={{ background: "#303031" }}
                            onClick={() => dispatch({ type: EDIT_CATEGORY_MODAL_CLOSE })}
                            className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </span>
                    </div>

                    <div className="flex flex-col space-y-1 w-full">
                        <label htmlFor="description">Category Description</label>
                        <textarea
                            value={des}
                            onChange={(e) => setDes(e.target.value)}
                            className="px-4 py-2 border focus:outline-none"
                            name="description"
                            id="description"
                            cols={5}
                            rows={5}
                        />
                    </div>

                    <div className="flex flex-col space-y-1 w-full">
                        <label htmlFor="status">Category Status</label>
                        <select
                            value={status}
                            name="status"
                            onChange={(e) => setStatus(e.target.value)}
                            className="px-4 py-2 border focus:outline-none"
                            id="status"
                        >
                            <option name="status" value="Active">Active</option>
                            <option name="status" value="Disabled">Disabled</option>
                        </select>
                    </div>

                    <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6">
                        <button
                            style={{ background: "#303031" }}
                            onClick={submitForm}
                            className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
                        >
                            Create category
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditCategory