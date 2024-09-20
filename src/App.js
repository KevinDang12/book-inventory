import './App.css';
import React from 'react';
import Form from './components/Form';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Inventory from './components/Inventory';

/**
 * Sets up the routes for the app
 * @returns The app component with routes to the Inventory and Add Book pages
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <Header />
            <div className='inventory'>
              <Inventory />
            </div>
          </div>
        }/>
        <Route path="/books" element={
          <div className="App">
            <Header />
            <header className="form">
              <Form />
            </header>
          </div>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
