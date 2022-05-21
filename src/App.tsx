import React from 'react';
import {Header} from './components/Header';
import {Route, Routes} from 'react-router-dom';
import {TaskTimer} from './components/TaskTimer';
import styles from './App.module.css';
import {Statistics} from './components/Statistics';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<TaskTimer />}></Route>
        <Route path="/statistics" element={<Statistics />}></Route>
      </Routes>
    </div>
  );
}

export default App;
