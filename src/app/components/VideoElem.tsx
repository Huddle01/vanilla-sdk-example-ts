import React, { useEffect, useRef } from "react";

const VideoElem = ({ track }: { track: MediaStreamTrack }) => {
  const getStream = (_track: MediaStreamTrack) => {
    const stream = new MediaStream();
    stream.addTrack(_track);
    return stream;
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoObj = videoRef.current;

    if (videoObj && track) {
      videoObj.srcObject = getStream(track);
      videoObj.onloadedmetadata = async () => {
        console.warn("videoCard() | Metadata loaded...");
        try {
          videoObj.muted = true;
          await videoObj.play();
        } catch (error) {
          console.error(error);
        }
      };
      videoObj.onerror = () => {
        console.error("videoCard() | Error is hapenning...");
      };
    }
  }, [track]);

  return (
    <div className="aspect-video overflow-hidden bg-white w-fit rounded-md">
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default VideoElem;
