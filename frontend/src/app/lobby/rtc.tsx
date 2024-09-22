'use client';
import { useSocket } from '@/hook/useSocket';
import { useEffect } from 'react';
import { EventMaping } from '@/util/eventTable';

const servers = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:5349',
        'stun:stun2.l.google.com:19302',
        'stun:stun4.l.google.com:5349',
      ],
    },
  ],
};


const EstablishRTC = () => {
  //const [localConnection, setLocalConnection] = useState<RTCPeerConnection>()
  const socket = useSocket();

  useEffect(() => {
    if (socket && typeof window !== undefined) {

      const SDPHandshake = async () => {
        const localConnection = new RTCPeerConnection(servers);

        localConnection.onicecandidate = (e) => {
          if (e.candidate?.candidate === "") {
            console.log('Done collecting Ice Candidate')
          }
          else if (e.candidate && e.candidate?.candidate !== "") {
            socket.emit(EventMaping.ICE_CLIENT_TO_SERVER, e.candidate)
          }
        };


        localConnection.addTransceiver('video');

        const offer = await localConnection.createOffer();
        await localConnection.setLocalDescription(offer);

        socket.emit(EventMaping.SDP_HANDSHAKE, offer);

        socket.on(EventMaping.ICE_SERVER_TO_CLIENT, async (candidate) => {
          try {
            await localConnection.addIceCandidate(new RTCIceCandidate(candidate))
          }
          catch (err) {
            console.log(err)
          }
        })

        socket.on(EventMaping.SDP_RESPONSE, async (answer) => {
          try {
            await localConnection.setRemoteDescription(new RTCSessionDescription(answer));
          } catch (err) {
            console.error("Failed to set remote description: ", err);
          }
        });
      }
      SDPHandshake();

      return () => {
        socket.off(EventMaping.SDP_RESPONSE);
        socket.off(EventMaping.ICE_SERVER_TO_CLIENT);
      };

    }
  }, [socket]);

  return null
};


export default EstablishRTC;
