import React, { useState , useContext} from 'react';
import Form from 'react-bootstrap/Form';
import AppContext from '../Contexts/app-context';


function RangeExample() {

  const ctx = useContext(AppContext);

  const [value, setValue] = useState(0); 
   

  const handleRangeChange = (e) => {
    const common = e.target.value;
    setValue(common);
    ctx.setRate(common * 10);
  };

  return (
    <>
      <Form.Label style={{ color: 'blue' }}>Rate Limiter (  def : 120pm )</Form.Label>
      <Form.Range value={value} disabled={ ctx.radioValue !== '3'} onChange={handleRangeChange} />
      <p>Selected Value: {ctx.rate}</p>
    </>
  );
}

export default RangeExample;
