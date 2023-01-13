import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Navbar, Home, Recent, Section } from './components/index';



const App = () => {
  return (
    <div className='app'>
      <Header />
      <div className='app__main-home'>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/Section" element={ <Section /> } />
        </Routes>
        <Recent />
      </div>
    </div>
  );
}

export default App;