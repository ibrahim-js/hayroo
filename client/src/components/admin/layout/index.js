import React, { Fragment } from 'react'

import { Navbar, Sidebar, Footer } from '../partials'

const AdminLayout = ({ children }) => {
    return (
        <Fragment>
            <Navbar />
            <section className="flex bg-gray-100">
                <Sidebar />
                <div className="w-full md:w-11/12 h-full" style={{ minHeight: '100vh' }}>
                {/* All Children pass from here */}
                {children}
                </div>
            </section>
            <Footer />
        </Fragment>
    )
}

export default AdminLayout
