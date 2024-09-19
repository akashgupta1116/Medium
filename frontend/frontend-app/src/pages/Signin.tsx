
import Auth from "../components/Auth";
import { Link, LinkProps, useNavigate } from 'react-router-dom';
import { signInInput } from "@akashgupta6/medium-common";
import axios from "axios";
const Signin = () => {
    const navigate = useNavigate();

    const onSubmit = async(obj: signInInput) => {
        const resp = await axios.post(
            "http://localhost:8787/api/v1/user/signin",
            obj
          );
          localStorage.setItem("token", resp.token);
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