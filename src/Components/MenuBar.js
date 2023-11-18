import OffcanvasVM from './OffcanvasVM';
import { Image } from 'react-bootstrap';
import brand4 from '../images/brand4.png';
import AppContext from '../Contexts/app-context';
import { useContext} from 'react';

function MenuBar(props) {
    const ctx = useContext(AppContext);


    return (
        <><nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="http://www.google.com"> <Image src={brand4} width="70" height="70" alt="Small Image" rounded thumbnail /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">XXX</span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    
                    <li className="nav-item">
                        <OffcanvasVM >VM Operations</OffcanvasVM>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="http://www.google.com" tabIndex="-1" aria-disabled="true" style={{color: "blue"}}>SERVER {ctx.radioValue === "3" ? "ON" : "OFF"}</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="./manual.html">HELP</a>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    );
}

export default MenuBar;