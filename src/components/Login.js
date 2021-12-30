import axios from "axios";
import React from "react";
import GoogleLogin from "react-google-login";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button, Icon, Image } from "semantic-ui-react";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  const onLogin = async (response) => {
    const { name, email, googleId, image } = response.profileObj;

    try {
      const user = await axios.post("http://localhost:1337/users", {
        name,
        email,
        googleId,
        image,
      });
      localStorage.setItem("userInfo", JSON.stringify(user.data));
    } catch (e) {
      console.log(e);
    }

    navigate("/dashboard");
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <div className="login">
      <Image
        avatar
        style={{ width: "260px", height: "100px", objectFit: "cover" }}
        size={"medium"}
        src={
          "https://cdn.dribbble.com/users/45617/screenshots/7867139/media/b61183f8a0b2869a9258b5599b56cb50.png"
        }
      />
      <div className="ui hidden divider"></div>
      <GoogleLogin
      className="login-btn"
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login"
        onSuccess={onLogin}
        onFailure={onError}
        cookiePolicy="single_host_origin"
        // isSignedIn={true}
      />
    </div>
  );
}
