import React, { useEffect } from 'react';
import styled from 'styled-components';
import AppProvider from '../AppContext';
import Layout from 'components/Layout';
import GlobalStyles from 'styles/GlobalStyles';
import clap from '../assets/sounds/clap.wav';
import hihat from '../assets/sounds/hihat.wav';
import kick from '../assets/sounds/kick.wav';
import openhat from '../assets/sounds/openhat.wav';
import boom from '../assets/sounds/boom.wav';
import ride from '../assets/sounds/ride.wav';
import snare from '../assets/sounds/snare.wav';
import tom from '../assets/sounds/tom.wav';
import tink from '../assets/sounds/tink.wav';

const Keys = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
  align-items: center;
  justify-content: center;

  .key {
    border: 0.4rem solid black;
    border-radius: 0.5rem;
    margin: 1rem;
    font-size: 1.5rem;
    padding: 1rem 0.5rem;
    transition: all 0.07s ease;
    width: 10rem;
    text-align: center;
    color: white;
    background: rgba(0, 0, 0, 0.4);
    text-shadow: 0 0 0.5rem black;
  }

  .playing {
    transform: scale(1.1);
    border-color: #ffc600;
    box-shadow: 0 0 1rem #ffc600;
  }

  kbd {
    display: block;
    font-size: 4rem;
  }

  .sound {
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    color: #ffc600;
  }
`;

const data = [
  { key: 'A', code: 65, name: 'clap', sound: new Audio(clap) },
  { key: 'S', code: 83, name: 'hihat', sound: new Audio(hihat) },
  { key: 'D', code: 68, name: 'kick', sound: new Audio(kick) },
  {
    key: 'F',
    code: 70,
    name: 'openhat',
    sound: new Audio(openhat),
  },
  { key: 'G', code: 71, name: 'boom', sound: new Audio(boom) },
  { key: 'H', code: 72, name: 'ride', sound: new Audio(ride) },
  { key: 'J', code: 74, name: 'snare', sound: new Audio(snare) },
  { key: 'K', code: 75, name: 'tom', sound: new Audio(tom) },
  { key: 'L', code: 76, name: 'tink', sound: new Audio(tink) },
];

const playsound = (e) => {
  const sound = data.find((el) => el.code === e.keyCode);
  if (sound) {
    const el = document.querySelector(`div[data-key="${e.keyCode}"]`);
    el.classList.add('playing');
    sound.sound.currentTime = 0;
    sound.sound.play();
  }
};

const removeTransition = (e) => {
  e.target.classList.remove('playing');
};

function App() {
  useEffect(() => window.addEventListener('keydown', playsound), []);

  return (
    <AppProvider>
      <GlobalStyles />
      <Layout>
        <Keys>
          {data.map(({ key, code, name }) => (
            <div
              className="key"
              key={key}
              data-key={code}
              onTransitionEnd={removeTransition}
            >
              <kbd>{key}</kbd>
              <span className="sound">{name}</span>
            </div>
          ))}
        </Keys>
      </Layout>
    </AppProvider>
  );
}

export default App;
