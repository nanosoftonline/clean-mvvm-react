import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState("")


  useEffect(() => {
    setName("Paul")
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{name}</span>
          Learn React Now fdfd
        </a>
      </header>
    </div>
  );
}

export default App;
