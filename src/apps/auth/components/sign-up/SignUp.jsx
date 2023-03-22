import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  renderButton,
  renderInput,
  renderSelect,
} from "../../../../utilities/uiElements";
import useValidator from "../../../../utilities/hooks/useValidator";
import { COUNTRY_URL, TIMEZONE_URL } from "../../apiConstants";
import { loadUtils, login, signup } from "../../store/userProfile";
import { Link } from "react-router-dom";
import signupSchema from "./signup.schema";
import { useRef } from "react";

function SignUp(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    country: "",
    timezone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const utils = useSelector((state) => state.entities.auth.userProfile.utils);
  const [apiError, setApiError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [errors, setErrors, validateForm, validateProperty] = useValidator(
    data,
    signupSchema
  );
  const handleBlur = ({ target: input }) => {
    validateProperty(input.name);
  };
  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const countryRef = useRef(null);
  const timezoneRef = useRef(null);
  const signUpRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      if (e.target == emailRef.current) {
        nameRef.current.focus();
      } else if (e.target == nameRef.current) {
        passwordRef.current.focus();
      } else if (e.target == passwordRef.current) {
        confirmPasswordRef.current.focus();
      } else if (e.target == confirmPasswordRef.current) {
        countryRef.current.focus();
      } else if (e.target == countryRef.current) {
        timezoneRef.current.focus();
      } else if (e.target == timezoneRef.current) {
        signUpRef.current.focus();
      }
    }
  };
  const handleSignUp = async () => {
    const error = validateForm();
    if (error) return;
    console.log(data);
    try {
      setApiError("");
      setIsLoading(true);
      const response = await dispatch(signup(data));

      if (response.status == 201) {
        const { data: jwt } = await dispatch(
          login({ email: data.email, password: data.password })
        );
        localStorage.setItem("access", jwt.access);
        localStorage.setItem("refresh", jwt.refresh);
        window.location.reload();
      }
    } catch (err) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!utils["countries"]["lastFetch"]) {
      dispatch(loadUtils({ url: COUNTRY_URL, name: "countries" }));
    }
  }, []);
  useEffect(() => {
    if (!utils["timeZone"]["lastFetch"]) {
      dispatch(loadUtils({ url: TIMEZONE_URL, name: "timeZone" }));
    }
  }, []);
  const countries = useSelector(
    (state) => state.entities.auth.userProfile.utils.countries
  );
  const timeZones = useSelector(
    (state) => state.entities.auth.userProfile.utils.timeZone
  );
  const countriesOptions = countries.data;
  const timeZoneOptions = timeZones.data[data.country] || [];
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  return (
    <div className="content-area login">
      <div className="flex flex--center" style={{ margin: "1rem 0" }}>
        Already have an account? &nbsp;<Link to="/auth/login">Log in</Link>
      </div>
      <header>
        <h3 className="header"> Sign up</h3>
      </header>
      <main className="login-form">
        {apiError && <span className="error-txt">{apiError}</span>}
        {renderInput({
          label: "Email",
          type: "email",
          name: "email",
          data,
          handleChange,
          onKeyDown: handleKeyDown,
          onBlur: handleBlur,
          ref: emailRef,
          errors,
        })}
        {renderInput({
          label: "Username",
          name: "username",
          data,
          handleChange,
          onKeyDown: handleKeyDown,
          onBlur: handleBlur,
          ref: nameRef,
          errors,
        })}
        {renderInput({
          label: "Password",
          type: "password",
          name: "password",
          data,
          handleChange,
          onKeyDown: handleKeyDown,
          onBlur: handleBlur,
          ref: passwordRef,
          errors,
        })}
        {renderInput({
          label: "confirm password",
          type: "password",
          name: "confirmPassword",
          data,
          handleChange,
          onKeyDown: handleKeyDown,
          onBlur: handleBlur,
          ref: confirmPasswordRef,
          errors,
        })}

        {renderSelect({
          name: "country",
          label: "Country",
          optionKeys: { name: "name", value: "value" },
          data,
          handleChange,
          options: countriesOptions,
          onKeyDown: handleKeyDown,
          onBlur: handleBlur,
          ref: countryRef,
          errors,
        })}
        {renderSelect({
          name: "timezone",
          label: "Timezone",
          data,
          handleChange,
          options: timeZoneOptions,
          onKeyDown: handleKeyDown,
          onBlur: handleBlur,
          ref: timezoneRef,
          errors,
        })}
        {renderButton({
          content: "Sign up",
          className: "btn--lg btn--block btn--blue",
          onClick: () => handleSignUp(data),
          onKeyDown: handleKeyDown,
          ref: signUpRef,
          loading,
        })}
      </main>
    </div>
  );
}

export default SignUp;
