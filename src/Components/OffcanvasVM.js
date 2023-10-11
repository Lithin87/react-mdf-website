import { useState , useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ToggleVM from './ToggleVM';



function OffcanvasVM(props) {
  const [show, setShow] = useState(false);
  const [now, setNow] = useState(0);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const totalDuration = 3 * 60 * 1000;

  useEffect(() => {
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
  }, [totalDuration]);

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
          <Offcanvas.Title style={sty}>KAFKA VM</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <ToggleVM {...{ now, checked, setChecked, radioValue, setRadioValue }} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffcanvasVM;