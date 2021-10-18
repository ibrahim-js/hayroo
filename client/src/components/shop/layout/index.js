import React, { Fragment } from 'react'

import { Navbar, CartModal, Footer } from '../partials'
import AuthModal from '../auth/AuthModal'

const Layout = ({ children }) => {
    return (
        <Fragment>
            <div className='flex-grow'>
                <Navbar />
                <AuthModal />
                <CartModal />
                { children }
            </div>
            <Footer />
        </Fragment>
    )
}

export default Layout
