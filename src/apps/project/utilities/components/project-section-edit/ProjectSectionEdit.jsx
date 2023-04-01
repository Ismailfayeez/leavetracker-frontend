import React, { useState } from 'react';
import { renderAutoComplete, renderButton, renderInput } from '../../../../../utilities/uiElements';
import useProjectSectionEdit from './useProjectSectionEdit';
import useAutoCompleteSuggestions from '../../../../../utilities/hooks/useAutoCompleteSuggestions';

function ProjectSectionEdit({
  sectionConstants,
  sectionId,
  fields,
  schema,
  autoCompleteFields = [],
  autoCompleteFieldDetails = []
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [{ sectionDetail, data, handleChange, handleSubmit, handleBlur, moveToPrevPage, errors }] =
    useProjectSectionEdit(sectionConstants, sectionId, fields, schema);

  if (!fields)
    fields = Object.keys(sectionDetail).map((key) => ({
      name: key,
      label: key
    }));

  const { clearSuggestions, fetchSuggestions, suggestions, isSuggestionsLoading } =
    useAutoCompleteSuggestions(autoCompleteFields, autoCompleteFieldDetails);

  const displayAutoComplete = ({ handleChange: onChange, handleBlur: onBlur, ...otherProps }) => {
    return renderAutoComplete({
      suggestions,
      isLoading: isSuggestionsLoading,
      handleChange: (e) => {
        onChange(e);
        fetchSuggestions(e.currentTarget);
      },
      handleBlur: (e) => {
        onBlur(e);
        clearSuggestions(e.currentTarget.name);
      },
      handleSelect: (e) => {
        onChange(e);
        clearSuggestions(e.currentTarget.name);
      },
      ...otherProps
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleSubmit();
    setIsLoading(false);
  };
  return (
    <form className="project-section-edit" onSubmit={onSubmit}>
      <div className="flex-item-grow flex flex--column gap--10px">
        {fields.map(({ displayContent, ...otherProps }) => (
          <div key={otherProps.name}>
            {displayContent === 'autoComplete'
              ? displayAutoComplete({
                  data,
                  handleChange,
                  handleBlur,
                  errors,
                  ...otherProps
                })
              : renderInput({
                  data,
                  handleChange,
                  onBlur: handleBlur,
                  errors,
                  ...otherProps
                })}
          </div>
        ))}
      </div>
      <div className="btn-container-grow">
        {renderButton({
          content: 'Submit',
          type: 'submit',
          className: 'btn btn--md btn--matte-black',
          loading: isLoading ? 1 : 0
        })}
        {sectionId !== 'new' &&
          renderButton({
            content: 'Back',
            className: 'btn btn--md btn--matte-black-outline',
            onClick: moveToPrevPage,
            type: 'button'
          })}
      </div>
    </form>
  );
}

export default ProjectSectionEdit;
