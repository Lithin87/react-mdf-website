import React from 'react';
import { Form } from 'react-bootstrap';
import MultiLineText from './MultiLineText';


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

    <MultiLineText isChecked= {props.toggle} schema={props.schema} setSchema={props.setSchema} ></MultiLineText>

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
          const fileContent = e.target.result;
          onFileUpload(fileContent); 
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

