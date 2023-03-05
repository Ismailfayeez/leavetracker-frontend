import _ from "lodash";
import Input from "../ui-kit/input/Input";
import AutoComplete from "../ui-kit/auto-complete/AutoComplete";
import LoadingSpinner from "../ui-kit/loading/loading-spinner/LoadingSpinner";
import Select from "../ui-kit/select/Select";
import TextArea from "../ui-kit/text-area/TextArea";

export const renderInput = ({
  type = "text",
  name,
  data,
  handleChange,
  errors = {},
  ...others
}) => {
  return (
    <Input
      type={type}
      name={name}
      value={data[name]}
      onChange={handleChange}
      error={errors[name]}
      {...others}
    />
  );
};
export const renderTextArea = ({
  type = "text",
  name,
  data,
  handleChange,
  errors,
  ...others
}) => {
  return (
    <TextArea
      type={type}
      name={name}
      value={data[name]}
      onChange={handleChange}
      error={errors[name]}
      {...others}
    />
  );
};
export const renderSelect = ({
  name,
  data,
  handleChange,
  errors = {},
  ...others
}) => {
  return (
    <Select
      name={name}
      value={data[name]}
      onChange={handleChange}
      error={errors[name]}
      {...others}
    />
  );
};
export const renderButton = ({ content, className, ...others }) => (
  <button className={`btn ${className}`} {...others} disabled={others.loading}>
    <div className="flex--center">
      {content}
      {others.loading && (
        <div style={{ marginLeft: "0.5rem" }}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  </button>
);

export const renderAutoComplete = ({
  data,
  name,
  errors,
  isLoading,
  suggestions,
  handleChange,
  handleBlur,
  handleSelect,
  handleFocus,
  ...otherProps
}) => {
  return (
    <AutoComplete
      value={data[name]}
      name={name}
      error={errors[name]}
      suggestions={suggestions[name]}
      isLoading={isLoading[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onSelect={handleSelect}
      autocomplete="off"
      {...otherProps}
    />
  );
};
