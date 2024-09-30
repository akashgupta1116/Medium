
import Auth from "../components/Auth";
import { Link, useNavigate } from 'react-router-dom';
import { SignInInput } from "@akashgupta6/medium-common";
import axios from "axios";
import { useState } from "react";

const Signin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<Boolean>(false)

    const onSubmit = async(obj: SignInInput) => {
        setIsLoading(true)
        try{
            const resp = await axios.post(
                "https://my-app.yoakash6.workers.dev/api/v1/user/signin",
                obj
              );
              localStorage.setItem("token", resp?.data?.token);
              setIsLoading(false)
              navigate("/blogs");

        }catch(err){
            setIsLoading(false)
        }
    }
    return (
        <Auth
            headerText = {"Sign In"}
            subheaderText={"Don't have an account?"}
            altRedirectBtn={<Link to="/signup">Sign up</Link>}
            actionBtn = {isLoading ? "Signing In..." : "Sign In"}
            onSubmit = {onSubmit}
            authType = "signin"
            isLoading = {isLoading}
        />
    )
}

export default Signin