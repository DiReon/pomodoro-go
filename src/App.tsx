import React from 'react';
import './App.css';
import { Header } from './Header';
import { Tasks } from './Tasks';

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
