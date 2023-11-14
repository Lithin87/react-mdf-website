import AuthContext from '../Contexts/app-context';
import { useContext } from 'react';

function ConsoleOutput() {

  const ctx = useContext(AuthContext);

  return (
    <div>
      <textarea
        value={ctx.consoleText}
        rows={10} 
        cols={80} 
        style={{ border: 'none', resize: 'none' }}
      />
    </div>
  );
}

export default ConsoleOutput;
