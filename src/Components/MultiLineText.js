import React , { useContext } from 'react';
import AppContext from '../Contexts/app-context';


function MultiLineText( {isChecked}) {
 
  const ctx = useContext(AppContext);

  const handleInputChange = (event) => {
    ctx.setText(event.target.value);
  };

  return (
    <div style={{ display: isChecked ? 'block' : 'none' }}>
      <h6 style={{ color: 'blue' }}>PASTE SCHEMA :</h6>
      <textarea
        value={ctx.text}
        onChange={handleInputChange}
        rows={4} 
        cols={60} 
      />
   
    </div>
  );
}

export default MultiLineText;
