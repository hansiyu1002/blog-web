import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewBlog from './pages/NewBlog';
import MyBlogs from './pages/MyBlogs';
import SingleBlog from './pages/SingleBlog';
import Navigation from './components/Navigation';
import Footer from './components/Footer'


function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/new_blog" element={<NewBlog />} />
                <Route path="/my_blogs" element={<MyBlogs />} />
                <Route path="/my_blogs/:id" element={<SingleBlog />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App