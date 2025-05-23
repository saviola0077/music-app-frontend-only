import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './AdminDashboard.css';
import MusicTable from './components/MusicTable';
import axios from 'axios';

const AdminView = () => {
  const [musicData, setMusicData] = useState([]);

  const getMusic = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/getMusic");
      setMusicData(res.data);
    } catch (err) {
      console.log("Error fetching music:", err.message);
    }
  };



  useEffect(() => {
    getMusic();
  }, []);

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <div className='view-content'>
          <div>
          <div>
              <MusicTable
                musicData={musicData}
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminView;
