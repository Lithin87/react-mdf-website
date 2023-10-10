import React from 'react';
import './PanelContent.css';
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
                <AccordionOptions />
            </Panel>

            <Panel header="DEFINE CONFIG SETTINGS">
                Learn more about our website here.
            </Panel>

            <Panel header="CHAT GPT AUTOMATION">
                Get in touch with us!
            </Panel>
        </>
    );
}

export default PanelContent;




