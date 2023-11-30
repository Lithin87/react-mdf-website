import React from 'react';
import { Form } from 'react-bootstrap';
import MultiLineText from './MultiLineText';
const jsonpath = require('jsonpath');

const SchemaInput = (props) => {
 
  const handleToggle = () => {
    props.setToggle(p => { if(p === false)  props.onFileUpload(""); return !p});
  };

  return (
  <div style={{display: 'flex' , flexDirection: 'column' }}> 
    <Form style={{flex: '5'}}>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="EditableText"
        checked={props.toggle}
        onChange={handleToggle}
      />
    </Form>

    <MultiLineText isChecked= {props.toggle} setToggle={props.setToggle}  schema={props.schema} setSchema={props.setSchema} eventKey={props.eventKey} ></MultiLineText>

    <FileInputExample  id={props.eventKey} onFileUpload={props.onFileUpload}   checked= {props.toggle} />
    </div>
  );
};

export default SchemaInput;

function FileInputExample({ onFileUpload ,id,checked }) {

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
              onFileUpload(body); 
              break;
            }
          }}
          else onFileUpload(fileContent); 

        };
  
        reader.readAsText(selectedFile); // You can use other methods like readAsDataURL for images
      }
    };

  return (
    <Form style={{ display: checked ? 'none' : 'block' }}>
      <Form.Group controlId={id} className="mb-3">
        <Form.Label style={{ color: 'blue' }}>CHOOSE A FILE</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
    </Form>
  );
}

