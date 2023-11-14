import {  useEffect , useContext} from 'react';
import { Button , Offcanvas } from 'react-bootstrap';
import ToggleVM from './ToggleVM';
import AppContext from '../Contexts/app-context';


function OffcanvasVM({children}) {

  const ctx = useContext(AppContext);
  
  const handleClose = () => ctx.setShow(false);
  const handleShow = () => ctx.setShow(true);
  
  useEffect(() => {
    const totalDuration = 3 * 2 * 1000;

    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= totalDuration) {
        clearInterval(interval);
        ctx.setNow(100);
      } else {
        const progress = (elapsedTime / totalDuration) * 100;
        ctx.setNow(progress);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [ctx.checked]);

  return (
    <>
      <Button  variant="info" onClick={handleShow}>
         {children}
      </Button>

      <Offcanvas show={ctx.show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="offcanvas-title">KAFKA VM <p><a href={ctx.vmstatus} target="_blank" rel="noopener noreferrer">{ctx.vmstatus}</a></p></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <ToggleVM />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffcanvasVM;