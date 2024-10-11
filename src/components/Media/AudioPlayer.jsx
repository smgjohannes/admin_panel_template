import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

const AudioPlayer = (props) => {
  const { fileUrl } = props;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mb-1">
      <audio ref={audioRef} src={fileUrl} />
      {isPlaying ? (
        <Button variant="danger" size="sm" onClick={handlePlayPause}>
          <FaPauseCircle />
        </Button>
      ) : (
        <Button variant="light" size="sm" onClick={handlePlayPause}>
          <FaPlayCircle />
        </Button>
      )}{' '}
    </div>
  );
};

export default AudioPlayer;
