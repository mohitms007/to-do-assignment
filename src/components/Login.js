import React from 'react'
import GoogleLogin from 'react-google-login'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function Login() {

  const location = useLocation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userInfo'))
  
  if(user) {
    return <Navigate to="/dashboard" state={{from: location}} replace />
  }
  
  const onLogin =  (response) => {
      console.log(response)
      localStorage.setItem('userInfo', JSON.stringify(response));
      navigate("/dashboard")
  }


  const onError = (error) => {
    console.log(error)
  }

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login"
        onSuccess={onLogin}
        onFailure={onError}
        cookiePolicy='single_host_origin'
      />
    </div>
  )
}
