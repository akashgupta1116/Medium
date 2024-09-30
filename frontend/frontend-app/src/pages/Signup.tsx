import Auth from "../components/Auth";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@akashgupta6/medium-common";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (obj: SignupInput) => {
    setIsLoading(true)
    try{
        const resp = await axios.post(
          "https://my-app.yoakash6.workers.dev/api/v1/user/signup",
          obj
        );
        localStorage.setItem("token", resp.data.token);
        setIsLoading(false)
        navigate("/blogs");

    }catch(err){
        setIsLoading(false)
    }
  };
  return (
    <Auth
      headerText={"Create an account"}
      subheaderText={"Already have an account?"}
      altRedirectBtn={<Link to="/signin">Sign In</Link>}
      actionBtn={isLoading ? "Signing Up...":"Sign Up"}
      onSubmit={onSubmit}
      authType="signup"
      isLoading = {isLoading}
    />
  );
};

export default Signup;
