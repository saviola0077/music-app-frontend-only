
import React, {useState, useEffect} from 'react';
import { render, screen } from '@testing-library/react';
import LoginUser from '../components/loginUser';
import Player from "../components/Player"
import axios from 'axios';

// Mock only useNavigate without using jest.requireActual
jest.mock('react-router', () => ({
  useNavigate: () => jest.fn(),
}));

test('renders login form', () => {
  render(<LoginUser />);

  // Check if email and password input fields are present
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  // Check if submit button is present
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

  // Check for Create New User and Admin Page links
  expect(screen.getByText(/create new user/i)).toBeInTheDocument();
  expect(screen.getByText(/admin page/i)).toBeInTheDocument();
});


//
function MusicLoader() {
  const [music, setMusic] = useState([]);

  useEffect(() => {
    const getMusic = async () => {
      try {
        const res = await fetch('/api/music'); // Example endpoint
        const data = await res.json();
        setMusic(data);
      } catch (err) {
        console.error(err);
      }
    };

    getMusic();
  }, []);

  return (
    <div>
      {music.map((song, index) => (
        <div key={index}>{song.title}</div>
      ))}
    </div>
  );
}

test('loads music and displays it', async () => {
  render(<MusicLoader />);
  // Add assertions here
});
