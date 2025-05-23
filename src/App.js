import {useState, useEffect} from 'react'; // usestate is a react hook that lets you add a state variable to your component
import Create from './components/createUser';
import Login from './components/loginUser';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';
import Home from './components/Home';
import AdminLogin from './admin/AdminLogin';
import AdminView from './admin/AdminView';
import AdminDashboard from '../src/admin/AdminDashboard';
import AdminUpload from '../src/admin/AdminUpload';
import AdminUpdate from './admin/AdminUpdate';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Create />} />
        <Route path="/admin/admin-login" element={<AdminLogin />} />
        <Route path="/admin/admin-music" element={<AdminView />} />
        <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/admin-upload" element={<AdminUpload />} />
        <Route path="/admin/admin-update/:id" element={<AdminUpdate />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
