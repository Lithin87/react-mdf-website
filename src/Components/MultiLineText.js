import React, { useCallback , useContext }  from 'react';
import ImageHint from './ImageHint';
import PanelContext from '../Contexts/panel-context';

function MultiLineText( props) {

  const pctx = useContext(PanelContext);
  const setSchema = pctx.setSchema;

  const handleInputChange = useCallback( (event) => {
    setSchema(event.target.value);
  },[setSchema]);

  return (
    <div style={{ display: pctx.toggle ? 'block' : 'none' }}>
      <h6 style={{ color: 'blue' }}>PASTE SCHEMA : <ImageHint htmlFor={props.eventKey} /></h6>
      <textarea
        value={pctx.schema}
        onChange={handleInputChange}
        rows={8} 
        cols={60} 
      />
   
    </div>
  );
}

export default MultiLineText;
