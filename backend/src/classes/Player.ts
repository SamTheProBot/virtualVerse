import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'wrtc';
import { EventMaping } from '../util/eventTable';
import { Socket } from 'socket.io';

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

export class Player {
  remoteConnection: RTCPeerConnection;
  socketId: null | string;
  constructor(socketId: string) {
    this.remoteConnection = new RTCPeerConnection(servers);
    this.socketId = socketId;
  }

  async createAnswer(offer: RTCOfferOptions) {
    try {
      await this.remoteConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await this.remoteConnection.createAnswer();
      await this.remoteConnection.setLocalDescription(answer);
      return answer;
    } catch (err) {
      console.log(err)
    }
  }

  async localICEcandidate(socket: Socket) {
    this.remoteConnection.onicecandidate = (e) => {
      if (e.candidate?.candidate === "") {
        console.log('Done collecting Ice Candidate')
      }
      else if (e.candidate && e.candidate?.candidate !== "") {
        socket.emit(EventMaping.ICE_SERVER_TO_CLIENT, e.candidate);
      }
    }
  }

  async remoteICEcandidate(candidate: RTCIceCandidateInit) {
    this.remoteConnection.addIceCandidate(new RTCIceCandidate(candidate))
  }
}
