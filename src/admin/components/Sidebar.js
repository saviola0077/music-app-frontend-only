import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // css importation
import { FaMusic, FaUpload, FaTachometerAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Music Admin</h2>
      <nav>
        <NavLink to="/admin/admin-dashboard" className="nav-link"> <FaTachometerAlt />  Dashboard</NavLink>
        <NavLink to="/admin/admin-music" className="nav-link"><FaMusic /> View Music</NavLink>
        <NavLink to="/admin/admin-upload" className="nav-link"> <FaUpload />Upload</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
