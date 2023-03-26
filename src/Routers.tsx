import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Car from './Pages/Car/Car';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import MyRequest from './Pages/MyRequest/MyRequest';
import Post from './Pages/Post/Post';
import Registration from './Pages/Registration/Registration';
import Users from './Pages/Users/Users';
import Layout from './UI/Layout/Layout';

function Routers() {
  return (
    <BrowserRouter>
    <Layout>
        <Routes>
          <Route path="/users" element={<Users/>} />
          <Route path="*" element={<div>404</div>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/post" element={<Post/>} />
          <Route path="/car" element={<Car/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/postmy" element={<MyRequest/>} />
        </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default Routers;
