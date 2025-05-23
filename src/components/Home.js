import { useState, useEffect } from 'react';
import Player from './Player';
import axios from 'axios';

function Home() {

  const [music, setMusic] = useState([]); // Initially an empty array

  const getMusic = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/getMusic");
      console.log(response.data);  // Log the data you receive from the server
      setMusic(response.data); // Update state with the music data
    } catch (error) {
      console.log("Error:", error.message); // Log the error message if any
    }
  };

  useEffect(() => {
    getMusic(); // Fetch music data when the component mounts
  }, []); // This will run once when the component mounts

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  // Update nextSongIndex based on currentSongIndex
  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > music.length - 1) {
        return 0; // Loop back to the first song
      } else {
        return currentSongIndex + 1; // Move to the next song
      }
    });
  }, [currentSongIndex, music.length]); // Ensure music length is considered

  return (
    <div>
      {/* Render Player component only when music has been fetched and it's not empty */}
      {music.length > 0 ? (
        <Player
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={music}
        />
      ) : (
        <p>Loading music...</p> // Display loading message until music is fetched
      )}
    </div>
  );
}

export default Home;
