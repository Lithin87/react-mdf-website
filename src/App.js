import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PanelContent from './Components/PanelContent';
import MenuBar from './Components/MenuBar';
import MultiLineText from './Components/MultiLineText';

import { useState } from 'react';
import AppContext from './Contexts/app-context';


function App() {

    const [now, setNow] = useState(0);
    const [show, setShow] = useState(false);
    const [vmstatus, setVmstatus] = useState("");
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [connect, setConnect] = useState([]);
    const [rate, setRate] = useState(120);
    const [text, setText] = useState('');

    const activeCtx = {
        now : now, setNow : setNow,
        show : show, setShow : setShow,
        vmstatus : vmstatus, setVmstatus : setVmstatus,
        checked : checked, setChecked : setChecked,
        radioValue : radioValue, setRadioValue : setRadioValue,
        connect : connect, setConnect : setConnect,
        rate : rate, setRate : setRate,
        text : text,setText : setText
    };

    return (
            <AppContext.Provider value={activeCtx}>
            <div className="App">
           
            <div className="columnpane">
                <nav> <h1>Mimic Data Framework</h1></nav>
                <MenuBar/>
                <PanelContent/>
                <footer> © 2023 My Website </footer>
            </div>

            </div>
            </AppContext.Provider>
    );
}

export default App;
