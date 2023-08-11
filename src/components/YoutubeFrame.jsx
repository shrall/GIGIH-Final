import React, { useEffect, useRef, useState } from "react";

const YouTubeFrame = ({ videoUrl }) => {
  const playerRef = useRef(null);
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

  useEffect(() => {
    if (videoId) {
      const onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player("youtube-player", {
          height: heightInPixels,
          width: widthInPixels,
          videoId: videoId,
        });
      };

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

      return () => {
        window.onYouTubeIframeAPIReady = null;
      };
    }
  }, [videoId]);

  return <div id="youtube-player"></div>;
};

export default YouTubeFrame;
