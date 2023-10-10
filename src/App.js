import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PanelContent from './Components/PanelContent';
import MenuBar from './Components/MenuBar';


function App() {
    return (
        <div className="App">
            <nav> <h1>Mimic Data Framework</h1></nav>
            <MenuBar/>
            <PanelContent/>
            <footer> © 2023 My Website </footer>
        </div>
    );
}

export default App;
