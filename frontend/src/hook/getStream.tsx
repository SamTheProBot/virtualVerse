'use client'

import { useState, useEffect } from "react";

export const useGetStream = () => {
  const [audioStream, setAudioStream] = useState<MediaStreamTrack | null>(null)
  const [videoStream, setVideoStream] = useState<MediaStreamTrack | null>(null)

  useEffect(() => {
    const getMediaStream = async () => {
      try {

        const localStream = await window.navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setAudioStream(localStream.getAudioTracks()[0])
        setVideoStream(localStream.getVideoTracks()[0])
      } catch (e) { console.log(e) }

    }
    getMediaStream();
  }, [])


  return [videoStream, audioStream];
}


