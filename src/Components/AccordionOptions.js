import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function FileInputExample({ onFileUpload ,id }) {

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
      <Form>
        <Form.Group controlId={id} className="mb-3">
          <Form.Label style={{ color: 'blue' }}>Choose a File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
      </Form>
    );
  }


function AccordionOptions(props) {

  const handleClick = () => {
    if(props.state === "")
    alert("Pls select the file")
    else
  {
    alert(props.state);
  }
   }


  return (
    <Accordion >
      <Accordion.Item eventKey={props.eventKey}>
        <Accordion.Header>{props.children}</Accordion.Header>
        <Accordion.Body>
        <div style={{ display: 'flex', alignItems: 'center' }}>
  <FileInputExample id={props.eventKey} onFileUpload={c => props.setState(c)} />
  <Button variant="primary" style={{ marginLeft: '70px', marginTop: '15px' }} onClick={handleClick}>
    SUBMIT
  </Button>
</div>

        <div>
        <h8 style={{ color: 'blue' }}>Uploaded File Content:</h8>
        <pre>{props.state}</pre>
      </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionOptions;