import LabelInput from "./LabelInput";
import React, {useState, ChangeEvent, useEffect} from "react";
import { LinkProps, useNavigate } from "react-router-dom";
import {SignupInput, SignInInput} from "@akashgupta6/medium-common"
import Button from "./Button";

interface AuthProps {
  headerText: string;
  subheaderText: string;
  altRedirectBtn: React.ReactElement<LinkProps>;
  actionBtn: string;
  onSubmit: (formData: formType) =>void ;
  authType: string;
  isLoading?: boolean
}

const signInState: SignInInput = {
    username: '',
    password: '',
}

const signUpState: SignupInput = {
    username: '',
    password: '',
    name: ''
}

type formType =  SignupInput | SignInInput;

const Auth = ({
  headerText,
  subheaderText,
  altRedirectBtn,
  actionBtn,
  onSubmit,
  authType,
  isLoading
}: AuthProps) => {
    const navigate = useNavigate();

    const [formInputs, setFormInputs] = useState<formType>(authType === "signup" ? signUpState: signInState);
    useEffect(()=> {
        if(localStorage.getItem('token')){
            navigate('/blogs')
        }
    }, [])
  return (
    <div className="grid grid-cols-2 w-screen">
      <div className="h-screen content-center">
        <div className="w-1/2 m-auto">
          <div className="text-center">
            <p className="font-bold text-3xl">{headerText}</p>
            <p className="text-slate-400">
              {subheaderText} {altRedirectBtn}
            </p>
          </div>
          <div className="mt-6">
            {authType === "signup" && (<LabelInput
              placeholder="Enter your username"
              label="Username"
              onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                  setFormInputs({
                      ...formInputs,
                      name: e.target.value
                  })
              }}
              type = "text"
            />)
            }

            
            <LabelInput
                placeholder="m@example.com"
                label="Email"
                onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                    setFormInputs({
                        ...formInputs,
                        username: e.target.value
                    })
                }}
                type = "text"
              />
            
            <LabelInput 
                type = "password"
                label="Password" 
                onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                    setFormInputs({
                        ...formInputs,
                        password: e.target.value
                    })
                }}
            />
          </div>
          <Button
            disabled = {isLoading}
            type="button"
            onClick = {()=>onSubmit(formInputs)}
          >
              {actionBtn}
          </Button>
        </div>
      </div>
      <div className="bg-slate-200 h-screen content-center">
        <p className="font-bold w-9/12 m-auto text-2xl">
          "The customer service I received was exceptional. The support team
          went above and beyond to address my concerns."
        </p>
        <div className="w-9/12 m-auto">
          <p className="text-slate-400 mt-3 font-bold">CEO, ACME Inc</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
