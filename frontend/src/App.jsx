import React from 'react';
import './styles/colors.css';
import './styles/typography.css';
import Header from './components/layout/Header';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <img
          src={`${process.env.PUBLIC_URL}/assets/logos/logo.svg`}
          className="App-logo"
          alt="logo"
        />
        <h1>Welcome to Project-Ethos</h1>
        <p>Empower your decisions with authentic company insights.</p>
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