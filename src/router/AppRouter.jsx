import React from 'react'
import { LoadingPage, LoginPage } from '../auth';
import { Navigate, Route, Routes } from 'react-router';
import { CalendarPage } from '../calendar';
import {  useAuthStore} from "../hooks"

export const AppRouter = () => {

    const { status: authStatus } = useAuthStore()

    return (
        <Routes>
            {
                authStatus === "not-authenticated"
                ? <Route path="/auth/login" element={<LoginPage />}/>
                : <Route path="/*" element={<CalendarPage />} />
            }
            <Route path='/*' element={<Navigate to="/auth/login" />}/>
        </Routes>
    )
}
