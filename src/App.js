import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Pages 
import Apropos from './pages/Apropos';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Trombinoscope from './pages/Trombinoscope';
import PrivateRoutes from './utils/PrivateRoute';
import Categories from './pages/Categories';
import TodoList from './pages//Tools/TodoList';
import Tools from './pages/Tools/Tools';

const App = () => {
  const [feed, updateFeed] = useState(true)   
  const [activePostUpdate, setActivePostUpdate] = useState(false)
  // Constante identifications
  const token = localStorage.getItem('token') // Token utilisateur [req.auth]
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoutes/>} >
          <Route path='/' element={<Home 
                        feed={feed} 
                        updateFeed={updateFeed}
                        activePostUpdate={activePostUpdate}
                        setActivePostUpdate={setActivePostUpdate} />}/>
          <Route path='/profile' element={<Profile 
                        feed={feed} 
                        updateFeed={updateFeed}
                        activePostUpdate={activePostUpdate}
                        setActivePostUpdate={setActivePostUpdate} />}/>
          <Route path='/a-propos' element={<Apropos/>} />
          <Route path='/trombinoscope' element={<Trombinoscope/>} />
          <Route path='/categories' element={<Categories 
                        feed={feed} 
                        updateFeed={updateFeed}/>} />
          <Route path='/outils' element={<Tools />} />
          <Route path='/todolist' element={<TodoList
                        feed={feed} 
                        updateFeed={updateFeed}/>}/>
          <Route path='*' element={<Navigate to="/" replace/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;