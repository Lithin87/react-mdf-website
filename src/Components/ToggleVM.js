import { useContext, useEffect } from 'react';
import { Image ,ButtonGroup, ToggleButton, ProgressBar, ListGroup } from 'react-bootstrap';
import Axios from 'axios';
import RangeExample from './Slider';
import bootOn from '../images/power-button.png';
import AppContext from '../Contexts/app-context';
import Form from 'react-bootstrap/Form';


function ToggleVM() {

  const ctx = useContext(AppContext);

  const handleReset = async () => { 
      const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/ipaddress';
      await Axios.get(url_r).then(response => {if(response.data === "") ctx.setVmstatus("OFF"); else {ctx.setVmstatus(response.data);
          ctx.setRadioValue("2") ; ctx.setChecked(true);  } })
       .catch(error => {
         console.error('IP Address fetch went wrong!', error);
       });
    }

  const radios = [
      { name: 'OFF', value: '1' },
      { name: 'ON', value: '2' },
     { name: 'READY', value: '3' },
  ];

  const handleClickToggleButton = async (e) => { 
      ctx.setChecked(e.currentTarget.checked);
      const on_off = e.currentTarget.checked === true ? 1 : 6;
      const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/'+ on_off;
      let response = "";
      response =  await Axios.get(url_r).catch((error) => {console.log("Error accessing backend"+error); });
      if(response !== "")
      {  ctx.setRadioValue(on_off === 6 ? "1" : "2");
      const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/ipaddress';
      await Axios.get(url_r).then(response => {if(response.data === "") {ctx.setVmstatus("OFF"); ctx.setPlugin([]); } else {ctx.setVmstatus(response.data);  ctx.setRadioValue("2") ; ctx.setChecked(true)   } })
        .catch(error => {
          console.error('IP Address fetch went wrong!', error);
        });
    }
   };

   const handleURL = async (e) => {
    ctx.setUrl(e.currentTarget.value);
   }



   useEffect(() => {   
    if(!ctx.vmstatus) handleReset();
    
    if ( ctx.vmstatus && !ctx.vmstatus.includes("OFF")  && ctx.plugin.length === 0 ) {
      const fetchData = async () => { if (await pluginListCall()) clearInterval(interval);};
      const interval = setInterval(fetchData, 5000);

      return () => clearInterval(interval);
    }
  }, [ctx.vmstatus]);


  return (
    <>
      <br /> <br />  
      <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={ ctx.checked}
        value="1"
        onChange={handleClickToggleButton}
      >
        <Image src={bootOn} width="50" height="40" alt="Small Image" rounded thumbnail /> BOOT ON </ToggleButton>

      <br/><br/><br />
    
      CURRENT STATUS :  <br/>
      <ButtonGroup>
        
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx === 1 ? 'outline-success' : idx === 2 ? 'outline-warning' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={ ctx.radioValue === radio.value}
            >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup><p/>
      <ProgressBar animated now={ ctx.now } label={`${Math.round( ctx.now)}%`} />

      <br/> <br/> <br /><br />
  
   <span style={{ fontFamily: 'Tahoma, Geneva, sans-serif' }}>PLUGINS INSTALLED : </span> 
      <br />
      <ListGroup>
      {ctx.plugin.map((item, index) => (
        <ListGroup.Item key={index} className="bg-light">{item}</ListGroup.Item>
      ))}
    </ListGroup>

    <br /> <br /> <br /> <br />
    <RangeExample/>
    <br /> <br />

    <span style={{ fontFamily: 'Tahoma, Geneva, sans-serif' }}>TARGET URL:</span>
    <Form.Control type="text" placeholder="Target URL" value={ctx.url} onChange={handleURL}/>

    </>
  );

  async function pluginListCall() {
    try {
      const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/2';
      let response = await Axios.get(url_r).catch((error) => { console.log("Error accessing backend" + error); });
      if (response !== undefined) {
        if (Array.isArray(response.data.message)) {
          const formattedJSON = response.data.message.filter(item => !item.class.includes("Mirror")).map(item => { const p = item.class.split('.'); return p[p.length - 1]; });
          ctx.setPlugin(formattedJSON);
          ctx.setRadioValue("3");
          ctx.now = 100;
          console.dir(formattedJSON, { depth: null });
          return true;
        }
      }
    } catch (error) {
      console.error('API error:', error);
    }
  }
}

export default ToggleVM;