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

    return (
        <>
            <Panel header="GENERATE DATA">
                <AccordionOptions  eventKey="4" >Generate from JSON</AccordionOptions>
            </Panel>

            <Panel header="DEFINE CONFIG SETTINGS">
            <AccordionOptions  eventKey="3" >Generate from SCHEMA</AccordionOptions>
            <AccordionOptions  eventKey="5" >Generate from Connector Configuration</AccordionOptions>
            </Panel>

            <Panel header="CHAT GPT AUTOMATION">
            <AccordionOptions  eventKey="9" >Ask questions from AI</AccordionOptions>
            </Panel>
        </>
    );
}

export default PanelContent;




