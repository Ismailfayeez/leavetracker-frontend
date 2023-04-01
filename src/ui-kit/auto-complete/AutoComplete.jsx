import React, { useState } from 'react';
import './autoComplete.scss';
import LoadingSpinner from '../loading/loading-spinner/LoadingSpinner';
import Input from '../input/Input';

function AutoComplete({
  suggestions = [],
  isLoading,
  name,
  value,
  className,
  onBlur = () => {},
  onFocus = () => {},
  onSelect = () => {},
  ...others
}) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={`form-group ${className || ''} auto-complete`}>
      <Input
        name={name}
        value={value}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur(e);
        }}
        {...others}
      />

      {isFocused && !suggestions.some((item) => item.value === value) && (
        <div className="auto-complete-suggestions-container">
          {isLoading ? (
            <div className="flex flex--center">
              <LoadingSpinner />
            </div>
          ) : suggestions.length ? (
            <ul className="auto-complete__suggestions">
              {suggestions.map((item) => (
                <li
                  key={item.value}
                  className="auto-complete__suggestions-item label"
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => onSelect({ currentTarget: { name, value: item.value } })}
                  role="presentation">
                  {item.value}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default AutoComplete;
