import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './AdminDashboard.css';
import axios from 'axios';

const AdminDashboard = () => {
  const [musicData, setMusicData] = useState();

  const getMusic = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/getMusic");
      console.log(response.data);  // Log the data you receive from the server
      setMusicData(response.data); // Update state with the music data
    } catch (error) {
      console.log("Error:", error.message); // Log the error message if any
    }
  };

  useEffect(() => {
    getMusic(); // Fetch music data when the component mounts
  }, []); // This will run once when the component mounts


  return (
    <div className="admin-container">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="main-content">
        <Header title="Dash Board" />
        <div className="music-list">
            {musicData && musicData.length === 0 ?  (
                  <p>No music available.</p>
                ) : (
                  musicData?.map((song, index) => (
                      <div key={index} className="music-card">
                        <h3>{song.title}</h3>
                        <p>Artist: {song.artist}</p>
                      </div>
                  ))
                )
              }
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
