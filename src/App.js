import {useState} from 'react';
import Player from './components/Player';

function App() {
  const [songs, setSongs] = useState([
    {
      title: "Joy is coming",
      artist: "Fido",
      img_src: "./images/fido.jpg"
      src: "./music/Fido-Joy-Is-Coming-(TrendyBeatz.com).mp3"
    },
    {
      title: "Military",
      artist: "Asake",
      img_src: "./images/asake.jpg"
      src: "./music/Asake_-_Military.mp3"
    },
    {
      title: "Jay Jay",
      artist: "Ruger",
      img_src: "./images/Ruger_(Singer).jpg"
      src: "./music/Ruger-Jay-Jay-(TrendyBeatz.com).mp3"
    },
    {
      title: "Safe Haven",
      artist: "Omahlay",
      img_src: "./images/omahlay.jpg"
      src: "./music/7310_Omah Lay - Safe Haven SHOW2BABI.COM.mp3"
    }
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextIndex] = useState(currentSongIndex + 1);


  return (
    <div className="App">
      <Player
        song={songs[currentSongIndex]}
        nextSong={songs[nextSongIndex]}
        />
    </div>
  );
}

export default App;
