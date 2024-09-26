import Auth from "../components/Auth";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@akashgupta6/medium-common";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const onSubmit = async (obj: SignupInput) => {
    const resp = await axios.post(
      "https://my-app.yoakash6.workers.dev/api/v1/user/signup",
      obj
    );
    console.log('resp-->', resp)
    localStorage.setItem("token", resp.data.token);
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
