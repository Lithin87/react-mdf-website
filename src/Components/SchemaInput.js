import React, { useCallback , useContext } from 'react';
import { Form } from 'react-bootstrap';
import MultiLineText from './MultiLineText';
import PanelContext from '../Contexts/panel-context';
const jsonpath = require('jsonpath');

const SchemaInput = (props) => {
 
  const pctx = useContext(PanelContext);

  const handleToggle = useCallback( () => {
    pctx.setToggle(p => { if(p === false)  pctx.setFileContent(""); return !p});
  },[pctx.setToggle, pctx.setFileContent]);

  return (
  <div style={{display: 'flex' , flexDirection: 'column' }}> 
    <Form style={{flex: '5'}}>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="EditableText"
        checked={pctx.toggle}
        onChange={handleToggle}
      />
    </Form>

    <MultiLineText eventKey={props.eventKey} />

    <FileInputExample  id={props.eventKey} />
    </div>
  );
};

export default SchemaInput;

function FileInputExample({ id }) {

  const pctx = useContext(PanelContext);

  const handleFileChange = (event) => {
      const selectedFile = event.target.files[0]; 
      if (selectedFile) {
        const reader = new FileReader();

        reader.onload = (e) => {
          let fileContent = e.target.result;

          if(id === '4') {
          fileContent = JSON.parse(fileContent);

          for (let i = 0; i < fileContent.item.length; i++) {
            const name = jsonpath.value(fileContent, `$.item[${i}].name`);
            // const verb = jsonpath.value(fileContent, `$.item[${i}].request.method`);
            // const url = jsonpath.value(fileContent, `$.item[${i}].request.url.raw`);
            if( name.split(" ")[0] === "200")
            {
              let body = jsonpath.value(fileContent, `$.item[${i}].request.body.raw`);
              pctx.setFileContent(body); 
              break;
            }
          }}
          else pctx.setFileContent(fileContent); 

        };
  
        reader.readAsText(selectedFile); // You can use other methods like readAsDataURL for images
      }
    };

  return (
    <Form style={{ display: pctx.toggle ? 'none' : 'block' }}>
      <Form.Group controlId={id} className="mb-3">
        <Form.Label style={{ color: 'blue' }}>CHOOSE A FILE</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
    </Form>
  );
}

