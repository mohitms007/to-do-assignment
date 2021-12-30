import React from 'react'
import { Navigate, Route, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';

export default function ProtectedRoute(props) {
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if(!user){
    return <Navigate to="/" state={{from: location}} replace />
  }

  return <Dashboard />
}
