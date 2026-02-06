import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { userData, checked } = useSelector((state) => state.user)

  // Auth check not finished yet — render nothing (or a loader)
  if (!checked) return <div style={{padding:20}}>Loading...</div>

  // If not authenticated, redirect to auth page
  if (!userData) return <Navigate to="/auth" replace />

  // Authenticated — render children
  return children
}

export default ProtectedRoute
