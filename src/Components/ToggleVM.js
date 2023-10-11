import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ProgressBar from 'react-bootstrap/ProgressBar';
import bootOn from '../images/power-button.png';
import { Image } from 'react-bootstrap';
import Axios from 'axios';

function ToggleVM( {now, checked, setChecked, radioValue, setRadioValue }) {

  const radios = [
      { name: 'OFF', value: '1' },
      { name: 'ON', value: '2' },
     { name: 'READY', value: '3' },
  ];

  const handleClickToggleButton = async (e) => {
    setChecked(e.currentTarget.checked);
  
    const result = e.currentTarget.checked === true ? 1 : 6;
    const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/'+ result;
     let response = "";
     response =  await Axios.get(url_r).catch((error) => {console.log("Error accessing backend"+error); });
     if(response !== "")
     { setRadioValue(result === 6 ? "1" : "2");
      const formattedJSON = JSON.stringify(response.data, null, 2); 
      console.log(formattedJSON);
     alert(formattedJSON);}
   };

   if (now >= 100) {
    setRadioValue("3");
  }
 
  return (
    <>
      <br />
      <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        onChange={handleClickToggleButton}
      >
        <Image src={bootOn} width="50" height="40" alt="Small Image" rounded thumbnail /> BOOT ON </ToggleButton>

      <br/><br/>

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
            checked={radioValue === radio.value}
            >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup><p/>
      <ProgressBar animated now={now} label={`${Math.round(now)}%`} />
    </>
  );
}

export default ToggleVM;