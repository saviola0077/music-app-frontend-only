import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './AdminDashboard.css';
import './AdminUpload.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AdminUpload = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uniqueId = uuidv4();

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

    console.log( formData.artistImage)
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const _formData = new FormData();
        _formData.append('image', formData.artistImage);
        _formData.append('audio', formData.songFile);
        
      // Call to backend for user creation
      try {
          //Uploading data to the cloud
          const uploadResponse  = await axios.post('http://localhost:4000/api/upload', _formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
    
          console.log(uploadResponse .data.imageUrl,uploadResponse .data.audioUrl)

          if(uploadResponse .data.imageUrl){
              //Upload data to the database
              const dbResponse  = await axios.post("http://localhost:4000/api/createMusic", {
                title: formData.title,
                artist: formData.artist,
                img_src: uploadResponse.data.imageUrl,
                src: uploadResponse.data.audioUrl,
              });

              setMessage("Music was uploaded successfully", dbResponse .data.imageUrl); // Show success message
              setError(null); // Clear any previous errors
          } else {
            setMessage(null); // Show success message
            setError("Image and audio was not successfully uploaded"); // Clear any previous errors
          }
       
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred';
        setError(`Error Uploading music: ${err.message}`);
        setMessage(null); // Clear any previous success messages
        console.log(err.response); 
    }finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="upload-section">
          <h2 className="upload-heading">Upload Music</h2>
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
              {loading ? 'Uploading...' : 'Upload Song'}
            </button>
            {/* Show success or error messages */}
           {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
           
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;