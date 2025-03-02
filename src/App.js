import {useState} from 'react';

function App() {
  const [songs, setSongs] = useState([
    {
    title: "Joy is coming",
    artist: "Fido",
    img_src: ".\images\fido.jpg"
    src: "\music\Fido-Joy-Is-Coming-(TrendyBeatz.com).mp3"

  ])
  return (
    <div className="App">
      COMPONENETS HERE!
    </div>
  );
}

export default App;
