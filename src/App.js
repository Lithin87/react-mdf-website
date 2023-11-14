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
    const [connect, setConnect] = useState([]);
    const [rate, setRate] = useState([]);

    const activeCtx = {
        now,
        setNow,
        show,
        setShow,
        vmstatus,
        setVmstatus,
        checked,
        setChecked,
        radioValue,
        setRadioValue,
        connect,
        setConnect,
        rate,
        setRate
    };

    return (
        <div className="App">
            <AppContext.Provider value={activeCtx}>
            <nav> <h1>Mimic Data Framework</h1></nav>
            <MenuBar/>
            <PanelContent/>
            <footer> © 2023 My Website </footer>
            </AppContext.Provider>
        </div>
    );
}

export default App;
