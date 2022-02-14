import React, { useState } from "react";

import { Link } from "react-router-dom";

import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import LoadingHoc from "../loading-hoc/loading-hoc.component";

import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/userState.atom";

import "./sign-in.styles.scss";

const SignInLoading = LoadingHoc(CustomButton);


const SignIn = () => {

  const [isLoading, setIsLoading] = useRecoilState(userState);
  const [error, setError] = useState('');
  const [state, setState] = useState({
    email: "",
    password: "",
    errorMessage: "",
  });

  const [showPassword, setShowPassword] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const { email, password, errorMessage } = state;

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setIsLoading(!isLoading);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      setState({
        email: "",
        password: "",
      });
      console.log('signed in')
      
      console.log(isLoading)
    }catch(error) {
      console.log(error.message)
      console.log(error.code)
      console.log(error.name)
      setIsLoading(false);
      if(error.code === 'auth/wrong-password') {
        setError('Wrong password!!')
      } else if (error.code === 'auth/too-many-requests') { setError('You are restricted from logging in temporarily due to many failed login attempts. ')}
      // auth/user-not-found 
    }
    
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="signin">
        <div className="signin__img">
          <h1>Welcome.</h1>
        </div>

        <div className="signin__form">
          <div className="content">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
              <FormInput
                handleChange={handleChange}
                name="email"
                type="email"
                value={state.email}
                label="Email"
                required
              />

              <FormInput
                handleChange={handleChange}
                name="password"
                type={showPassword ? "text" : "password"}
                value={state.password}
                label="Password"
                toggleShowPassword={toggleShowPassword}
                showPassword={showPassword}
                required
              />

              <p> {error} </p>

              <div className="buttons">
                {/* <CustomButton children='Sign in' /> */}
                <SignInLoading isLoading={isLoading} children='Sign in' />
              </div>

              <div className="signup">
                <span  >Don't have an account? <Link className="signup__link" to='/signup'>Sign up</Link>
                  
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
