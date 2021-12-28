import React from 'react'
import GoogleLogin from 'react-google-login'

export default function Login() {


  const onLogin =  (response) => {
      console.log(response)
      localStorage.setItem('userInfo', JSON.stringify(response.profileInfo));
  }


  const onError = (error) => {
    console.log(error)
  }
  console.log(process.env.REACT_APP_CLIENT_ID)
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
