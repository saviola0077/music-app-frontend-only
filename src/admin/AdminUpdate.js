import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './AdminDashboard.css';
import './AdminUpload.css';
import axios from 'axios';
import { useParams } from 'react-router-dom'; //To grab the music ID from the URL

const AdminUpdate = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams(); // Get ID from URL

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    artistImage: null,
    songFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

        const _formData = new FormData();
        _formData.append('image', formData.artistImage);
        _formData.append('audio', formData.songFile);
    
        try {
          const uploadResponse = await axios.post('http://localhost:4000/api/upload', _formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
    
          if (uploadResponse.data.imageUrl && uploadResponse.data.audioUrl) {
            const dbResponse = await axios.post(`http://localhost:4000/api/updateMusic/${id}`, {
              title: formData.title,
              artist: formData.artist,
              img_src: uploadResponse.data.imageUrl,
              src: uploadResponse.data.audioUrl,
            });
    
            setMessage("Music was Updated successfully");
            setError(null);
          } else {
            const dbResponse = await axios.post(`http://localhost:4000/api/updateMusic/${id}`, {
              title: formData.title,
              artist: formData.artist,
              img_src: formData.imageUrl,
              src: formData.artistImage,
            });
    
            setMessage("Music was Updated successfully");
            setError(null);
          }
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred';
          setError(`Error uploading music: ${errorMessage}`);
          setMessage(null);
        } finally {
          setLoading(false);
        }

    
  };

  const getMusicByID = async (id) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/getMusicById/${id}`);
      const musicData = response.data;
      setFormData((prev) => ({
        ...prev,
        title: musicData.title || '',
        artist: musicData.artist || '',
        artistImage: musicData.artistImage || null,
        songFile: musicData.songFile || null
      }));
    } catch (err) {
      console.error("Error fetching music:", err.message);
      setError("Failed to load music details");
    }
  };

  useEffect(() => {
    if (id) {
        console.log(id)
      getMusicByID(id);
    }
  }, [id]);

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="upload-section">
          <h2 className="upload-heading">Update Music</h2>
          <form className="music-upload-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="artist">Artist</label>
              <input type="text" id="artist" name="artist" value={formData.artist} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="artistImage">Artist Image</label>
              <input type="file" id="artistImage" name="artistImage" accept="image/*" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="songFile">Song File</label>
              <input type="file" id="songFile" name="songFile" accept="audio/*" onChange={handleChange} required />
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Song'}
            </button>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdate;
