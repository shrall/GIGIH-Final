import React, { useEffect, useRef, useState } from "react";

const YouTubeFrame = ({ videoUrl }) => {
  const playerRef = useRef(null);
  const [videoId, setVideoId] = useState(null);

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
          height: "390",
          width: "640",
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
