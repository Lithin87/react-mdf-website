import { Button , Accordion } from 'react-bootstrap';
import Axios from 'axios';
import AppContext from '../Contexts/app-context';
import PanelContext from '../Contexts/panel-context';
import { useState, useContext, useEffect, useCallback } from 'react';
import ConsoleOutput from './ConsoleOutput';
import SchemaInput from './SchemaInput';
import Spinner from 'react-bootstrap/Spinner';


function AccordionOptions(props) {

  let key = props.eventKey;
  const [output, setOutput] = useState(""); 
  const [fileContent, setFileContent] = useState('');
  const [schema, setSchema] = useState('');
  const [toggle, setToggle] = useState(false);
  const [error_url, setError_url] = useState("");
  const [offset, setOffset] = useState("--");
  const [operation, setOperation] = useState(false);
  
  const panelCtx = {
    output , setOutput ,
    fileContent , setFileContent ,
    schema , setSchema ,
    toggle , setToggle ,
    error_url , setError_url ,
    offset , setOffset ,
    operation , setOperation 
};

  const ctx = useContext(AppContext);


  const cluster_url = process.env.REACT_APP_BACKEND_HOST + '/services/7';
  const offset_url = process.env.REACT_APP_BACKEND_HOST + '/services/10';

 
  let interval = null;

  const handleClick = useCallback ( async () => {
    let final_schema = { schema : "" , url : ctx.url };

    if(toggle === false)
    if(fileContent === "") setOutput(p => p + "\nNo File Selected. Using Pre-Configured Data"); else final_schema.schema = fileContent;
    else
    if(schema === "") setOutput(p => p + "\nNo Schema Selected. Using Pre-Configured Data"); else final_schema.schema = schema;
    
    let max_interval = Math.round((60 * 1000) / ctx.rate);
    let iter  = ctx.iteration ?? -1;
    const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/'+ key +'?rate='+ max_interval + '&set=' + iter ;
    let response = {};

    response =  await Axios.post(url_r, final_schema , { headers: { 'Content-Type': 'application/json' } }).catch((error) => {console.log("Error accessing backend"+error); });
   
    if(key !== '9')
    {
        let response1 =  await Axios.get(cluster_url).catch((error) => {console.log("Error accessing backend"+error); });
        setError_url(response1.data.message);
    }


      if(response !== undefined )
    {  
         setOperation(true);
         setOutput(response.data);
    }
   },[cluster_url, ctx.rate, ctx.iteration ,ctx.url, fileContent, key, schema, toggle]);



   useEffect(() => 
   {   let aichat = ctx.aichat;
    // console.log("Hi ABC"+aichat);
    if(aichat && key === '4') {
   if (aichat.type  === "req4") setOperation(true); else setOperation(false);
   setOutput({ message : aichat.msg });
    }  
  }, [ctx.aichat]);


   const handleDelete = useCallback( async () => { 
    clearInterval(interval);
    const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/8';
    Axios.get(url_r).then(r => {setOperation(false);setOutput(r.data)}).catch((error) => {console.log("Error accessing backend"+error) });
    },[interval])



    useEffect(() => {   
      async function offsetfetch() {
         Axios.get(offset_url).then(p => setOffset(p.data.message)).catch((error) => { console.log("Error accessing backend" + error); });
      }

      if( operation === true ) {
        interval = setInterval( offsetfetch, 5000);
        return () => clearInterval(interval); }
      }
    , [operation === true && key !== '9']);
  

    const decodedString = fileContent.replace(/^"|"$/g, '').replace(/\\"/g, '"').replace(/\\r\\n/g, '\r\n');



  return (
    <PanelContext.Provider value={panelCtx}>
    <Accordion >
      <Accordion.Item eventKey={key}>
        <Accordion.Header >{props.children}  <Spinner animation="grow" variant="success"  hidden={!operation || key === '9' }/> </Accordion.Header>
        <Accordion.Body>

        <div style={{ display: 'flex' }}>
          <div style={{display: 'flex', flex: '3', alignItems: 'flex-start' }}>
            <SchemaInput eventKey={key}  style={{flex: '1'}}  />
          </div>

          <div style={{display: 'flex', flex: '4', alignItems: 'flex-start' }}>
            <Button variant="primary" size="sm" style={{ marginTop: '33px' }} onClick={handleClick}> SUBMIT </Button>
            <Button variant="danger" size="sm" hidden={key === '9'} style={{ marginLeft: '20px', marginTop: '33px' }} onClick={handleDelete}> DELETE </Button>  

            <div style={{display: 'flex', flex: '3', alignItems: 'flex-start' , flexDirection: 'column'}}>
              <a target="_blank" rel="noopener noreferrer" href={error_url}  style={{color: 'red' ,  marginLeft: '100px', marginTop: '30px',  textDecoration: 'none' }}> ERRORS : {offset[0]} </a> 
              <a target="_blank" rel="noopener noreferrer" href={error_url}  style={{color: 'green' ,  marginLeft: '100px', marginTop: '30px' , textDecoration: 'none'}}> SUCCESS : {offset[1]}</a> 
            </div>

          </div>

          <div style={{display: 'flex', flex: '1.6' , alignItems: 'flex-start'}}>
              <ConsoleOutput eventKey={key}/>
          </div>
        </div>

        <div style={{ display: fileContent === "" ? 'none' : 'block' }}>
          <h6 style={{ color: 'blue' }}>Uploaded File Content:</h6>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{decodedString}</pre>
        </div>
     
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

    </PanelContext.Provider>
  );

}

export default AccordionOptions;