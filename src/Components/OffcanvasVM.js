import {  useEffect , useContext, useCallback} from 'react';
import { Button , Offcanvas } from 'react-bootstrap';
import ToggleVM from './ToggleVM';
import AppContext from '../Contexts/app-context';


function OffcanvasVM({children}) {

  const ctx = useContext(AppContext);
  
  const handleClose = useCallback( () => ctx.setShow(false),[ctx]);
  const handleShow = useCallback( () => ctx.setShow(true),[ctx]);
  
  useEffect(() => {
  if( ctx.checked === true && ctx.radioValue !== '3')
  {
    let totalDuration = 3 * 19 * 1000;

    if(ctx.radioValue === '2')
     totalDuration = 3 * 77 * 1000;
  
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
    }, 250);

      return () => {
       clearInterval(interval);
      };
  }else ctx.setNow(100);
  }, [ctx.checked, ctx.radioValue]);


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