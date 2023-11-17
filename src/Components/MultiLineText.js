import React  from 'react';

function MultiLineText( props) {

  const handleInputChange = (event) => {
    props.setSchema(event.target.value);
  };

  return (
    <div style={{ display: props.isChecked ? 'block' : 'none' }}>
      <h6 style={{ color: 'blue' }}>PASTE SCHEMA :</h6>
      <textarea
        value={props.schema}
        onChange={handleInputChange}
        rows={8} 
        cols={60} 
      />
   
    </div>
  );
}

export default MultiLineText;
