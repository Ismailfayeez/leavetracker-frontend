import React, { useRef } from 'react';

function AutoComplete({suggestionList=[],valueField,content,className,label,name,error,...others}) {
    const inputRef=useRef()
    
    
    return (
        <div className={`form-input ${className? className:""}`}>
            {label &&
            <label htmlFor={name+"_id"}>{label}</label>}
            <input list={name} ref={inputRef} name={name} id={name+"_id"}  {...others}/>
            <datalist id={name}>
            {
            !suggestionList.some(item=>valueField?item[valueField]==inputRef.current.value:
                item==inputRef.current.value)
            &&
            suggestionList.map(
                item=>(
                    <option value={valueField?item[valueField]:item}>
                        {content?content(item):item}
                    </option>
                )
            )}
            </datalist>
            {error && <p>{error}</p>}
        </div>
    );
}

export default AutoComplete;