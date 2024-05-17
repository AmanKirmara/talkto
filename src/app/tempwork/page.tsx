"use client"
import React, { useState, useEffect } from 'react';

function Page() {
  const [audio, setAudio] = useState(new Audio());
  const [playing, setPlaying] = useState(false);

  const playAudio = () => {
    audio.play();
    setPlaying(true);
  };

  const stopAudio = () => {
    audio.pause();
    setPlaying(false);
    audio.currentTime = 0;
  };

  useEffect(() => {
    audio.src = 'click.mp3'; 
    const interval = setInterval(() => {
      playAudio();
      setTimeout(() => {
        stopAudio();
      }, 1000); 
    }, 2000); 

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className='w-full h-full'>
      audio page ...
    </div>
  );
}

export default Page;
