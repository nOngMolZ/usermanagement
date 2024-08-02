import React from 'react';

const AddNewButton = ({ isAddingNew, toggleAddNew, className = '',buttonText }) => {
  return (
    
      <button 
        onClick={toggleAddNew} 
        className={`${className}  text-white px-4 py-2 rounded`}
      >
        {buttonText}
      </button>
    
  );
};

export default AddNewButton;
