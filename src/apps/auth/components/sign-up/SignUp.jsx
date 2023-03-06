import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  renderButton,
  renderInput,
  renderSelect,
} from "../../../../utilities/uiElements";
import useValidator from "../../../../utilities/useValidator";
import { COUNTRY_URL, TIMEZONE_URL } from "../../apiConstants";
import { loadUtils, login, signup } from "../../store/userProfile";
import { Link } from "react-router-dom";
import signupSchema from "./signup.schema";

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
    } catch (err) {}
    setIsLoading(false);
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
          onBlur: handleBlur,
          errors,
        })}
        {renderInput({
          label: "Username",
          name: "username",
          data,
          handleChange,
          onBlur: handleBlur,
          errors,
        })}
        {renderInput({
          label: "Password",
          type: "password",
          name: "password",
          data,
          handleChange,
          onBlur: handleBlur,
          errors,
        })}
        {renderInput({
          label: "confirm password",
          type: "password",
          name: "confirmPassword",
          data,
          handleChange,
          onBlur: handleBlur,
          errors,
        })}

        {renderSelect({
          name: "country",
          label: "Country",
          optionKeys: { name: "name", value: "value" },
          data,
          handleChange,
          options: countriesOptions,
          onBlur: handleBlur,
          errors,
        })}
        {renderSelect({
          name: "timezone",
          label: "Timezone",
          data,
          handleChange,
          options: timeZoneOptions,
          onBlur: handleBlur,
          errors,
        })}
        {renderButton({
          content: "Sign up",
          className: "btn--lg btn--block btn--blue",
          onClick: () => handleSignUp(data),
          loading,
        })}
      </main>
    </div>
  );
}

export default SignUp;
