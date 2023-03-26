import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Car from './Pages/Car/Car';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Post from './Pages/Post/Post';
import Registration from './Pages/Registration/Registration';
import Users from './Pages/Users/Users';
import Routers from './Routers';
import Layout from './UI/Layout/Layout';

function App() {
  return (
    <Routers></Routers>
  );
}

export default App;
