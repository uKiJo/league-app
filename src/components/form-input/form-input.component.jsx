import React from "react";

import "./form-input.styles.scss";

import sprite from './sprite.svg';

const FormInput = ({toggleShowPassword, showPassword, handleChange, label, ...otherProps }) => (
  <div className="group">
    <div className="pwd">
      <input className="form-input" onChange={handleChange} {...otherProps} />
      <div
        className={
          otherProps.name === "password" ||
          otherProps.name === "confirmPassword"
            ? "show"
            : "hide"
        }
      >
          
        <svg className={`${showPassword ? "clear-eye" : "barred-eye"}`} onClick={toggleShowPassword}>
          <use href={sprite + "#icon-eye"} />
        </svg>
        <svg className={`${showPassword ? "barred-eye" : "clear-eye"}`} onClick={toggleShowPassword}> 
          <use href={sprite + "#icon-eye-blocked"}></use>
        </svg>
      </div>
    </div>

    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
