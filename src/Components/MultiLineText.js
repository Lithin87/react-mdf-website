import React, { useCallback }  from 'react';
import ImageHint from './ImageHint';

function MultiLineText( props) {

  const handleInputChange = useCallback( (event) => {
    props.setSchema(event.target.value);
  },[props]);

  return (
    <div style={{ display: props.isChecked ? 'block' : 'none' }}>
      <h6 style={{ color: 'blue' }}>PASTE SCHEMA : <ImageHint htmlFor={props.eventKey} setSchema={props.setSchema} setToggle={props.setToggle}/></h6>
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
