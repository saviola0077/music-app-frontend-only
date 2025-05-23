import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MusicTable = ({ musicData }) => {
  const [music, setMusic] = useState([]);

  const navigate = useNavigate();

  const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

  const deleteMusic = async (id) => {
    if (!id) return console.warn('Invalid ID');

    setLoading(true); // Start loading
    setMessage("Deleting Music");

    try {
      await axios.post(`http://localhost:4000/api/deleteMusic/${id}`);
      setMusic((prev) => prev.filter(musicData => musicData.id !== id));

      setMessage("Music was Deleted successfully"); // Show success message
      setError(null); // Clear any previous errors
      setLoading(false); // Stop loading
    } catch (err) {
      console.error("Error deleting music:", err.message);
      setMessage(null); // Show success message
      setError("Image and audio was not successfully uploaded"); // Clear any previous errors
    }
  };

  const updateMusic = async (id) => {
    console.log('Update song with ID:', id);
    
    // Implement modal or navigation here
    navigate(`/admin/admin-update/${id}`);
  };

  useEffect(() => {
    if (Array.isArray(musicData)) {
      setMusic(musicData);
    } else {
      console.warn("musicData is not an array:", musicData);
    }
  }, [musicData]);

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Artist',
      selector: row => row.artist,
      sortable: true,
    },
    {
      name: 'Image',
      cell: row => row.img_src ? <img src={row.img_src} alt={row.title} width="50" /> : 'No image',
    },
    {
      name: 'Audio',
      cell: row => row.src ? <audio controls src={row.src} /> : 'No audio',
    },
    {
      name: 'Actions',
      cell: row => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => updateMusic(row.id)}
            style={{
              borderRadius: '25%',
              border: '2px solid gray',
              backgroundColor: 'blue',
              color: 'white',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
              width: '60px',
              height: '60px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Update
          </button>
          <button
            onClick={() => deleteMusic(row.id)}
            style={{
              borderRadius: '25%',
              border: '2px solid gray',
              backgroundColor: 'darkred',
              color: 'white',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
              width: '60px',
              height: '60px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Music List</h2>
      <DataTable
        columns={columns}
        data={music}
        pagination
        highlightOnHover
        responsive
        noDataComponent="No music found"
      />
      {/* Show success or error messages */}
      {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            {loading ? <p className="success-message">{message}</p> : ''}
    </div>
  );
};

export default MusicTable;
