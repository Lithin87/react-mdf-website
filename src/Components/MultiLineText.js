import React , { useContext } from 'react';
import AppContext from '../Contexts/app-context';


function MultiLineText() {
 
  const ctx = useContext(AppContext);

  const handleInputChange = (event) => {
    ctx.setText(event.target.value);
  };

  return (
    <div>
      <h2>INPUT TEXT</h2>
      <textarea
        value={ctx.text}
        onChange={handleInputChange}
        rows={12} 
        cols={10} 
      />
   
    </div>
  );
}

export default MultiLineText;
