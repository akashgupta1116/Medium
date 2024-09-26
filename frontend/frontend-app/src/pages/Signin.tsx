
import Auth from "../components/Auth";
import { Link, useNavigate } from 'react-router-dom';
import { SignInInput } from "@akashgupta6/medium-common";
import axios from "axios";
const Signin = () => {
    const navigate = useNavigate();

    const onSubmit = async(obj: SignInInput) => {
        const resp = await axios.post(
            "http://my-app.yoakash6.workers.dev/api/v1/user/signin",
            obj
          );
          localStorage.setItem("token", resp?.data?.token);
          navigate("/blogs");
    }
    return (
        <Auth
            headerText = {"Sign In"}
            subheaderText={"Don't have an account?"}
            altRedirectBtn={<Link to="/signup">Sign up</Link>}
            actionBtn = {"Sign In"}
            onSubmit = {onSubmit}
            authType = "signin"
        />
    )
}

export default Signin