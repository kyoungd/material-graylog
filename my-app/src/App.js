import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Logger from "./logger";

function App() {
  useEffect(() => {
    const logger = new Logger({ url: "http://localhost:12201/gelf", host: "young-3" });

    const init = async () => {
      const { error, data } = await logger.debug("THis is a log from graylog test", {
        another: "Logs",
        another2: "Logss"
      });
      console.log('error: ', error);
      console.log('data: ', data);
    }
    init();

  }, []);

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
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
