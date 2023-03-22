import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  renderButton,
  renderInput,
  renderSelect,
} from "../../../../utilities/uiElements";
import useValidator from "../../../../utilities/hooks/useValidator";
import { updateCurrentUser } from "../../store/userProfile";
import editProfileFormSchema from "./editProfileForm.schema";
function EditProfile(props) {
  const dispatch = useDispatch();
  const initialState = {
    username: "",
    timezone: "",
    country: "",
  };
  const currentUser = useSelector(
    (state) => state.entities.auth.userProfile.currentUser.data
  );
  const [isLoading, setIsLoading] = useState(false);
  const { username, timezone, country } = currentUser;
  const [data, setData] = useState(initialState);
  const [errors, setErrors, validateForm, validateProperty] = useValidator(
    data,
    editProfileFormSchema
  );

  useEffect(() => {
    if (currentUser.email) {
      setData({ username, timezone, country });
    }
  }, [currentUser.email]);
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const countries = useSelector(
    (state) => state.entities.auth.userProfile.utils.countries
  );
  const timeZones = useSelector(
    (state) => state.entities.auth.userProfile.utils.timeZone
  );
  const countriesOptions = countries.data;
  const timeZoneOptions = timeZones.data[data.country] || [];
  const handleBlur = ({ target: input }) => {
    validateProperty(input.name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) return;
    setIsLoading(true);
    console.log("ass");
    try {
      await dispatch(updateCurrentUser(data));
      props.handleEditSuccess();
    } catch (err) {}
    setIsLoading(false);
  };
  console.log(data);
  useEffect(() => {
    if (data.country) {
      const timezone =
        (timeZones.data[data.country] && timeZones.data[data.country][0]) || [];
      setData({ ...data, timezone });
    }
  }, [data.country]);
  return (
    <form className=" flex flex--column  full-height" onSubmit={handleSubmit}>
      <div className="flex-item-grow flex flex--column gap--10px">
        {renderInput({
          name: "username",
          label: "Name",
          data,
          handleChange,
          errors,
          onBlur: handleBlur,
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
      </div>
      <div className="btn-container">
        {renderButton({
          content: "Submit",
          className: "btn btn--md btn--matte-black",
          type: "submit",
          loading: isLoading,
        })}
      </div>
    </form>
  );
}

export default EditProfile;
