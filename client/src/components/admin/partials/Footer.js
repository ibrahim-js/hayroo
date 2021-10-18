import React, { Fragment } from 'react'
import moment from 'moment'

const Footer = () => {
    return (
        <Fragment>
            <footer style={{ background: "#303031", color: "#87898A" }} className="z-10 py-6 px-4 md:px-12 text-center">
                Develop & Design Hasan-py | Debug and rebuild by IbrahimJS © Copyright {moment().format("YYYY")}
            </footer>
        </Fragment>
    )
}

export default Footer
