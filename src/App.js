import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PanelContent from './Components/PanelContent';
import MenuBar from './Components/MenuBar';

import { useState } from 'react';
import AppContext from './Contexts/app-context';


function App() {

    const [now, setNow] = useState(0);
    const [show, setShow] = useState(false);
    const [vmstatus, setVmstatus] = useState("");
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [plugin, setPlugin] = useState([]);
    const [rate, setRate] = useState(60);
    const [schema, setSchema] = useState('');
    const [url, setUrl] = useState('https://target-400-bxlquyhk2q-uc.a.run.app');

    const activeCtx = {
        now , setNow ,
        show , setShow ,
        vmstatus , setVmstatus ,
        checked , setChecked ,
        radioValue , setRadioValue ,
        plugin , setPlugin ,
        rate, setRate ,
        schema , setSchema ,
        url  , setUrl 
    };

    return (
            <AppContext.Provider value={activeCtx}>
            <div className="App">
           
            <div className="columnpane">
                <nav> <h1>Mimic Data Framework</h1></nav>
                <MenuBar/>
                <PanelContent/>
                <footer> © 2023 Boots </footer>
            </div>

            </div>
            </AppContext.Provider>
    );
}

export default App;
