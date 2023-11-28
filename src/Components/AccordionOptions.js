import { Button , Accordion } from 'react-bootstrap';
import Axios from 'axios';
import AppContext from '../Contexts/app-context';
import { useState, useContext} from 'react';
import ConsoleOutput from './ConsoleOutput';
import SchemaInput from './SchemaInput';


function AccordionOptions(props) {

  let key = props.eventKey;
  const [output, setOutput] = useState(""); 
  const [fileContent, setFileContent] = useState('');
  const [schema, setSchema] = useState('');
  const [toggle, setToggle] = useState(false);
  const [error_url, setError_url] = useState("");
  

  const ctx = useContext(AppContext);
  const cluster_url = process.env.REACT_APP_BACKEND_HOST + '/services/7';

  const handleClick = async () => {
    let final_schema = { schema : "" , url : ctx.url};
    console.log(final_schema);

    if(toggle === false)
    if(fileContent === "") setOutput(p => p + "\nNo File Selected. Using Pre-Configured Data"); else final_schema.schema = fileContent;
    else
    if(schema === "") setOutput(p => p + "\nNo Schema Selected. Using Pre-Configured Data"); else final_schema.schema = schema;
    
    let max_interval = (60 * 1000) / ctx.rate;
    const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/'+ key +'?rate='+ max_interval;
    let response = "";
    response =  await Axios.post(url_r, final_schema , { headers: { 'Content-Type': 'application/json' } }).catch((error) => {console.log("Error accessing backend"+error); });
    let response1 =  await Axios.get(cluster_url).catch((error) => {console.log("Error accessing backend"+error); });
    setError_url(response1.data.message);
    if(response !== "")
    {  
      setOutput(response.data);
    }
   }

   const handleDelete = async () => { 
    const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/8';
    let response = "";
    response =  await Axios.get(url_r).catch((error) => {console.log("Error accessing backend"+error); });
    let response1=  await Axios.get(cluster_url).catch((error) => {console.log("Error accessing backend"+error); });
    setError_url(response1.data.message);
    if(response !== "")
    {  
      setOutput(response.data);
    }
    }

    const decodedString = fileContent.replace(/^"|"$/g, '').replace(/\\"/g, '"').replace(/\\r\\n/g, '\r\n');



  return (
    <Accordion >
      <Accordion.Item eventKey={key}>
        <Accordion.Header >{props.children} </Accordion.Header>
        <Accordion.Body>

        <div style={{ display: 'flex' }}>
          <div style={{display: 'flex', flex: '1 1 0', alignItems: 'flex-start' , alignContent: 'flex-start'}}>
            <SchemaInput eventKey={key}  onFileUpload={setFileContent}  schema={schema} setSchema={setSchema} toggle={toggle}  setToggle={setToggle} style={{flex: '1'}}  />
            <a target="_blank" rel="noopener noreferrer" href={error_url}  style={{color: 'red' , flex: '0 0 0', marginLeft: '100px', marginTop: '70px' }}> ERRORS </a> 
            <Button variant="primary" size="sm" style={{flex: '0 0 0', marginLeft: '150px', marginTop: '33px' }} onClick={handleClick}> SUBMIT </Button>
            <Button variant="danger" size="sm" hidden={key === '9'} style={{flex: '0 0 0', marginLeft: '20px', marginTop: '33px' }} onClick={handleDelete}> DELETE </Button>       
          </div>
          <ConsoleOutput>{ output }</ConsoleOutput>
        </div>

        <div style={{ display: fileContent === "" ? 'none' : 'block' }}>
          <h6 style={{ color: 'blue' }}>Uploaded File Content:</h6>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{decodedString}</pre>
        </div>
     
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionOptions;