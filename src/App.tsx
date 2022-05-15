import React from 'react';
import styles from './App.module.css';
import { Header } from './components/Header';
import { Tasks } from './components/Tasks';
import {TaskTimer} from "./components/TaskTimer";

function App() {
  return (
    <div>
      <Header />
      <div className={styles.layout}>
        <Tasks />
        <TaskTimer />
      </div>
    </div>
  );
}

export default App;
