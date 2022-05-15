import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Tasks } from './components/Tasks';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Tasks />
      </div>
    </div>
  );
}

export default App;
