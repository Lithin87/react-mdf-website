import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PanelContent from './Components/PanelContent';
import MenuBar from './Components/MenuBar';
import { useState } from 'react';
import AuthContext from './Contexts/app-context';

function App() {

    const [now, setNow] = useState(0);
    const [show, setShow] = useState(false);
    const [vmstatus, setVmstatus] = useState("");
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

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
        setRadioValue
    };

    return (
        <div className="App">
            <AuthContext.Provider value={activeCtx}>
            <nav> <h1>Mimic Data Framework</h1></nav>
            <MenuBar/>
            <PanelContent/>
            <footer> © 2023 My Website </footer>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
