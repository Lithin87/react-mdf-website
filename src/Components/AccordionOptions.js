import { Form , Button , Accordion } from 'react-bootstrap';
import Axios from 'axios';
import AppContext from '../Contexts/app-context';
import { useState, useContext} from 'react';
import ConsoleOutput from './ConsoleOutput';
import SchemaInput from './SchemaInput';



function AccordionOptions(props) {

  const [output, setOutput] = useState(""); 
  const [checked, setChecked] = useState(false);

  const ctx = useContext(AppContext);

  const handleClick = async () => {
    let schema = {};
    if(props.state === "") setOutput(p => p+"No File Selected. Using Pre-Configured Data"); else schema = props.state;

    let max_interval = (60* 1000) / ctx.rate;
    const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/'+ props.eventKey+'?rate='+ max_interval;
    let response = "";
    response =  await Axios.post(url_r, schema , { headers: { 'Content-Type': 'application/json' } }).catch((error) => {console.log("Error accessing backend"+error); });
    if(response !== "")
    {  
      setOutput(response.data);
    }
   }

   const handleDelete = async () => { 
    const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/8';
    let response = "";
    response =  await Axios.get(url_r).catch((error) => {console.log("Error accessing backend"+error); });
    if(response !== "")
    {  
      setOutput(response.data);
    }
    }


  return (
    <Accordion >
      <Accordion.Item eventKey={props.eventKey}>
        <Accordion.Header>{props.children}</Accordion.Header>
        <Accordion.Body>

        <div style={{ display: 'flex' }}>
          <div style={{display: 'flex', flex: '1 1 0', alignItems: 'flex-start' , alignContent: 'flex-start'}}>
            <SchemaInput eventKey={props.eventKey}  onFileUpload={c => props.setState(c)}  style={{flex: '1'}} checked={checked} setChecked={setChecked}  />
            <Button variant="primary" size="sm" style={{flex: '0 0 0', marginLeft: '200px', marginTop: '33px' }} onClick={handleClick}> SUBMIT </Button>
            <Button variant="danger" size="sm" hidden={props.eventKey === '9'} style={{flex: '0 0 0', marginLeft: '20px', marginTop: '33px' }} onClick={handleDelete}> DELETE </Button>
          </div>
          <ConsoleOutput>{ output }</ConsoleOutput>
        </div>

        <div style={{ display: props.state === "" ? 'none' : 'block' }}>
        <h6 style={{ color: 'blue' }}>Uploaded File Content:</h6>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{props.state}</pre>
      </div>
     
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionOptions;