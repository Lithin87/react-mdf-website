
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ProgressBar from 'react-bootstrap/ProgressBar';

function ToggleVM( {now, checked, setChecked, radioValue, setRadioValue }) {

  const radios = [
      { name: 'OFF', value: '1' },
      { name: 'ON', value: '2' },
     { name: 'READY', value: '3' },
  ];


  return (
    <>
      <br />
      <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        onChange={(e) => setChecked(e.currentTarget.checked)}
      >
        BOOT ON
      </ToggleButton>

      <br/><br/>

      CURRENT STATUS :  <br/>
      <ButtonGroup>
        
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx === 1 ? 'outline-success' : idx === 2 ? 'outline-warning' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}>
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <ProgressBar animated now={now} label={`${Math.round(now)}%`} />
    </>
  );
}

export default ToggleVM;