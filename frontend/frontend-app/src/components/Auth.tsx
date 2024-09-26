import LabelInput from "./LabelInput";
import React, {useState, ChangeEvent} from "react";
import { LinkProps } from "react-router-dom";
import {SignupInput, SignInInput} from "@akashgupta6/medium-common"

interface AuthProps {
  headerText: string;
  subheaderText: string;
  altRedirectBtn: React.ReactElement<LinkProps>;
  actionBtn: string;
  onSubmit: () =>void ;
  authType: string;
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
}: AuthProps) => {
    
    const [formInputs, setFormInputs] = useState<formType>(authType === "signup" ? signUpState: signInState)
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
          <button
            type="button"
            onClick = {()=>onSubmit(formInputs)}
            className="w-full h-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {actionBtn}
          </button>
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
