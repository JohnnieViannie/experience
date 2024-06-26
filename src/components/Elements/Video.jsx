import React, { useEffect, useRef } from 'react';
import './Video.css'; // Import your CSS file for styling
import HeaderImage from "../../assets/img/developer.svg";
import Video from "../../assets/img/video.mp4";

const VideoWithOverlay = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const thumb = document.querySelector('.thumbnail');
    thumb.style.display = 'none';

    const video = videoRef.current;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener('ended', handleEnded);

    video.play().catch(error => {
      console.error('Autoplay failed:', error);
    });

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="video-container">
      {/* Thumbnail */}
      <img
        className="thumbnail"
        src={HeaderImage}
        alt="Video Thumbnail"
      />
      
      {/* Overlay */}
      <div className="overlay">
        {/* Video Player */}
        <video className="videoz" controls autoPlay muted ref={videoRef}>
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoWithOverlay;