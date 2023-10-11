import { useState , useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ToggleVM from './ToggleVM';
import Axios from 'axios';


function OffcanvasVM(props) {
  const [now, setNow] = useState(0);
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    
  
  useEffect(() => {
    const totalDuration = 3 * 60 * 1000;

    const url_r = process.env.REACT_APP_BACKEND_HOST + '/services/ipaddress';


      Axios.get(url_r).then(response => {if(response.data === "") setData("OFF"); else {setData(response.data);  setRadioValue("2") ; setChecked(true)   } })
        .catch(error => {
          console.error('IP Address fetch went wrong!', error);
        });
     
// if(checked === true) 
// {
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= totalDuration) {
        clearInterval(interval);
        setNow(100);
      } else {
        const progress = (elapsedTime / totalDuration) * 100;
        setNow(progress);
      }
    }, 500);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  // }

  }, [radioValue]);

const sty = {
  color: 'blue',
  textAlign: 'center',
  border: '2px solid blue',
  padding: '8px',
  display: 'block', 
  width: '100%',    
  backgroundColor: 'hwb(218 24% 29% / 0.547)'
};


  return (
    <>
      <Button  variant="info" onClick={handleShow}>
         {props.children}
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={sty}>KAFKA VM <p><a href={data} target="_blank" rel="noopener noreferrer">{data}</a></p></Offcanvas.Title>
          
        </Offcanvas.Header>
        <Offcanvas.Body>
         <ToggleVM {...{ now, checked, setChecked, radioValue, setRadioValue }} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffcanvasVM;