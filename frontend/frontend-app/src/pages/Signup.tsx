import Auth from "../components/Auth";
import { Link, LinkProps, useNavigate } from "react-router-dom";
import { signupInput } from "@akashgupta6/medium-common";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const onSubmit = async (obj: signupInput) => {
    const resp = await axios.post(
      "http://localhost:8787/api/v1/user/signup",
      obj
    );
    localStorage.setItem("token", resp.token);
    navigate("/blogs");
  };
  return (
    <Auth
      headerText={"Create an account"}
      subheaderText={"Already have an account?"}
      altRedirectBtn={<Link to="/signin">Sign In</Link>}
      actionBtn={"Sign Up"}
      onSubmit={onSubmit}
      authType="signup"
    />
  );
};

export default Signup;
