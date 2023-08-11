import React, { useEffect, useRef, useState } from "react";

const YouTubeFrame = ({ videoUrl }) => {
  const [videoId, setVideoId] = useState(null);

  const screenWidth = window.innerWidth; // Get the width of the screen
  let widthInPixels = screenWidth * 0.7;
  let heightInPixels = widthInPixels * 0.6; // 16:9 aspect ratio

  // Check if it's mobile and set width and height to full screen width
  if (screenWidth <= 768) {
    widthInPixels = screenWidth;
    heightInPixels = widthInPixels * 0.8; // 16:9 aspect ratio
  }
  useEffect(() => {
    const extractVideoId = (url) => {
      const videoIdRegex =
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
      const match = url.match(videoIdRegex);
      return match ? match[1] : null;
    };
    const extractedVideoId = extractVideoId(videoUrl);

    if (!extractedVideoId) {
      console.error("Invalid YouTube video URL:", videoUrl);
      return;
    }

    setVideoId(extractedVideoId);
  }, [videoUrl]);

  return <div className="video-responsive">
    <iframe
      width={widthInPixels}
      height={heightInPixels}
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>;
};

export default YouTubeFrame;
