import React , { useState } from 'react';
import AccordionOptions from './AccordionOptions';

function Panel(props) {
    return (
        
        <div className="panel">
            <div className="panel-header">{props.header}</div>
            <div className="panel-content">{props.children}</div>
        </div>
    );
}

function PanelContent(props) {

     const [fileContent0, setFileContent0] = useState('');
     const [fileContent1, setFileContent1] = useState('');
     const [fileContent2, setFileContent2] = useState('');
     const [fileContent3, setFileContent3] = useState('');



    return (
        <>
            <Panel header="GENERATE DATA">
                <AccordionOptions  eventKey="0" state={fileContent0}  setState= {setFileContent0} >Generate from SCHEMA</AccordionOptions>
                <AccordionOptions  eventKey="1" state={fileContent1}  setState= {setFileContent1} >Generate from JSON</AccordionOptions>
            </Panel>

            <Panel header="DEFINE CONFIG SETTINGS">
            <AccordionOptions  eventKey="2" state={fileContent2}  setState= {setFileContent2} >Generate from Connector Configuration</AccordionOptions>
            </Panel>

            <Panel header="CHAT GPT AUTOMATION">
            <AccordionOptions  eventKey="3" state={fileContent3}  setState= {setFileContent3} >Ask questions from AI</AccordionOptions>
            </Panel>
        </>
    );
}

export default PanelContent;




