import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./sign-up.styles.scss";

import { auth, createUserProfileDocument } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";




const SignUp = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    nickName: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const { email, password, nickName, confirmPassword } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(state);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user)
      await createUserProfileDocument(user, { nickName });

    }catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;

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
            <h2>Create your account</h2>
            <span>Sign up with your email and password</span>

            {/* onSubmit={this.handleSubmit} */}

            <form onSubmit={handleSubmit}>
              <FormInput
                type="text"
                name="nickName"
                value={nickName}
                onChange={handleChange}
                label="Nickname"
                required
              />

              <FormInput
                handleChange={handleChange}
                name="email"
                type="email"
                value={email}
                label="Email"
                required
              />

              <FormInput
                handleChange={handleChange}
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                label="Password"
                toggleShowPassword={toggleShowPassword}
                showPassword={showPassword}
                required
              />

              <FormInput
                handleChange={handleChange}
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                label="Confirm Password"
                toggleShowPassword={toggleShowPassword}
                showPassword={showPassword}
                required
              />

              <div className="buttons">
                <CustomButton children="Sign up" />
              </div>

              <div className="signup">
                <span>
                  Have an account?{" "}
                  <Link className="signup__link" to="/signin">
                    Sign in
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
