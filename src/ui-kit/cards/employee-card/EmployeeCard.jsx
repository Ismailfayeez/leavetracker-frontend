import React from 'react';
import "./employeeCard.scss"
function EmployeeCard({img,name,email,className,enableCheckBox,disableCheckBoxInput,checked,handleChecked}) {
    return (
        <div className={`employee-card ${className}`}>
            {enableCheckBox && <input type='checkbox' className="employee-card__check-box" 
            disabled={disableCheckBoxInput} checked={checked} 
            onClick={e=>handleChecked(e,{name,email})}/>}
            <div className='flex'>
            {img&&<div className='employee-card__image-container flex-item--center'>
                {img}
            </div>}
            <div className='employee-card-content flex-item--center'>
                <div className='employee-card__name'>{name}</div>
                <div className='employee-card__email'>{email}</div>
            </div>
            </div>
            {/* {enableRemoveBtn && 
            <div>
                {renderButton({content:'remove',
                className:'btn--md btn--matte-black',
                onClick:handleRemove})}
            </div>} */}
            
        </div>
    );
}

export default EmployeeCard;