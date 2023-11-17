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
    const [plugin, setPlugin] = useState([]);
    const [rate, setRate] = useState(120);
    const [schema, setSchema] = useState('');

    const activeCtx = {
        now : now, setNow : setNow,
        show : show, setShow : setShow,
        vmstatus : vmstatus, setVmstatus : setVmstatus,
        checked : checked, setChecked : setChecked,
        radioValue : radioValue, setRadioValue : setRadioValue,
        plugin : plugin, setPlugin : setPlugin,
        rate : rate, setRate : setRate,
        schema : schema, setSchema : setSchema
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
