import { Form , Button , Accordion, Toast } from 'react-bootstrap';
import Axios from 'axios';


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

  const handleClick = async () => {
    let schema = {};
    if(props.state === "") alert("NO file selected. Using Pre-Configured Data"); else schema = props.state;
    console.log(schema);
    const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/'+ props.eventKey;
    let response = "";
    response =  await Axios.post(url_r, schema , { headers: { 'Content-Type': 'application/json' } }).catch((error) => {console.log("Error accessing backend"+error); });
    if(response !== "")
    {  
      alert(JSON.stringify(response.data));
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
  {/* <pre style={{ marginLeft: '70px', marginTop: '15px' }}>{props.state}</pre> */}
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