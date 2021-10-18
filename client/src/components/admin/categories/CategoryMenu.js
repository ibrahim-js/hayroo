import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'

import AddCategory from './AddCategory'
import EditCategory from './EditCategory'
import { addCatModal } from '../../../actions/category'

const CategoryMenu = () => {
    const dispatch = useDispatch()

    return (
        <Fragment>
            <div className="col-span-1 flex items-center">
                <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center w-full">
                {/* It's open the add category modal */}
                    <div 
                        style={{ background: "#303031" }}
                        onClick={() => dispatch(addCatModal(true))}
                        className="cursor-pointer rounded-full p-2 flex items-center justify-center text-gray-100 text-sm font-semibold uppercase"
                    >
                        <svg className="w-6 h-6 text-gray-100 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        Add Category
                    </div>
                </div>
                <AddCategory />
                <EditCategory />
            </div>
        </Fragment>
    )
}

export default CategoryMenu
