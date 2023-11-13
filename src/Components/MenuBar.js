import OffcanvasVM from './OffcanvasVM';
import { Image } from 'react-bootstrap';
import brand4 from '../images/brand4.png';
import AuthContext from '../Contexts/app-context';
import { useContext} from 'react';

function MenuBar(props) {
    const ctx = useContext(AuthContext);


    return (
        <><nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="http://www.google.com"> <Image src={brand4} width="70" height="70" alt="Small Image" rounded thumbnail /></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon">XXX</span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="http://www.google.com">HOME</a>
                    </li>

                    <li class="nav-item">
                        <OffcanvasVM >VM Operations</OffcanvasVM>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="http://www.google.com" tabindex="-1" aria-disabled="true" style={{color: "blue"}}>SERVER {ctx.radioValue === "3" ? "ON" : "OFF"}</a>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    );
}

export default MenuBar;