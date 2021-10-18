import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AdminLayout from '../layout'
import DashboardCard from './DashboardCard'
import Customize from './Customize'
import TodaySell from './TodaySell'

import { initDashboard } from '../../../actions/dashboard'

const AdminDashboard = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initDashboard())
    }, [dispatch])

    return (
        <AdminLayout>
            <DashboardCard />
            <Customize />
            <TodaySell />
        </AdminLayout>
    )
}

export default AdminDashboard
