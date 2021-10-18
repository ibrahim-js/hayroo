import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchCategories, toggleFilter, fetchProducts, searchProduct, toggleSearch } from '../../../actions/home'

const apiURL = process.env.REACT_APP_API_URL

const CategoryList = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const data = useSelector(state => state.home)
    const [categories, setCategories] = useState(null)
  
    useEffect(() => {
      dispatch(fetchCategories(setCategories))
    }, [dispatch])
  
    return (
        <div className={`${data.categoryListDropdown ? "" : "hidden"} my-4`}>
            <hr />
            <div className="py-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                categories && categories.length
                ? categories.map((item, index) => (
                    <Fragment key={index}>
                        <div onClick={() => history.push(`/products/category/${item._id}`)} className="col-span-1 m-2 flex flex-col items-center justify-center space-y-2 cursor-pointer">
                            <img src={`${apiURL}/uploads/categories/${item.cImage}`} alt="pic" />
                            <div className="font-medium">{item.cName}</div>
                        </div>
                    </Fragment>
                ))
                : <div className="text-xl text-center my-4">No Category</div>
            }
            </div>
        </div>
    )
}

const FilterList = () => {
    const [range, setRange] = useState(0)

    const data = useSelector(state => state.home)
    const dispatch = useDispatch()
  
    const rangeHandle = (e) => {
      setRange(e.target.value)
      dispatch(fetchProducts(e.target.value))
    }

    const closeFilterBar = () => {
      dispatch(fetchProducts())
      dispatch(toggleFilter(!data.filterListDropdown))
      setRange(0)
    }
  
    return (
        <div className={`${data.filterListDropdown ? "" : "hidden"} my-4`}>
            <hr />
            <div className="w-full flex flex-col">
                <div className="font-medium py-2">Filter by price</div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-2  w-2/3 lg:w-2/4">
                        <label htmlFor="points" className="text-sm">Price (between 0$ and { range }$):
                            <span style={{ marginLeft: '.5rem' }} className="font-semibold text-yellow-700">{ range }.00$</span>
                        </label>
                        <input value={range} className="slider" type="range" id="points" min="0" max="1000" step="10" onChange={rangeHandle} />
                    </div>

                    <div onClick={closeFilterBar} className="cursor-pointer">
                        <svg className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Search = () => {
    const [search, setSearch] = useState('')
    
    const dispatch = useDispatch()
    const data = useSelector(state => state.home)
  
    const searchHandle = (e) => {
      setSearch(e.target.value)
      dispatch(searchProduct(e.target.value))
    }
  
    const closeSearchBar = () => {
      dispatch(toggleSearch(!data.searchDropdown))
      dispatch(searchProduct())
      setSearch('')
    }
  
    return (
        <div className={`${data.searchDropdown ? "" : "hidden"} my-4 flex items-center justify-between`}>
            <input value={search} onChange={searchHandle} className="px-4 text-xl py-4 focus:outline-none" type="text" placeholder="Search products..." />
            <div onClick={closeSearchBar} className="cursor-pointer">
                <svg className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    )
}

const ProductCategoryDropdown = () => {
    return (
        <Fragment>
            <CategoryList />
            <FilterList />
            <Search />
        </Fragment>
    )
}

export default ProductCategoryDropdown
