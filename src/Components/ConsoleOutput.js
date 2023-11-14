import AuthContext from '../Contexts/app-context';
import { useContext } from 'react';

function ConsoleOutput() {

  const ctx = useContext(AuthContext);

  return (
    <div>
      <textarea
        value={ctx.consoleText}
        rows={20} 
        cols={60} 
      />
    </div>
  );
}

export default ConsoleOutput;
