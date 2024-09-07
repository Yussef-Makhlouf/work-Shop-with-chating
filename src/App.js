import './App.css';
import './index.css';

import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import ChatPage from './components/Chat';
import HeroSection from './components/HeroSection';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
