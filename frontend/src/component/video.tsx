"use client"
import { useRef } from 'react'

const VideoPanal = ({ videoStream, audioStream }) => {
  const stream = useRef();

  return (
    <>
      <section>
        <video autoPlay ref={stream}></video>
      </section>

    </>
  )
}

